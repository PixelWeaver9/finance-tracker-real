"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusCircle, RefreshCw, Home, BarChart3, List } from "lucide-react";
import StatsCards from "./StatsCards";
import TransactionList from "./TransactionList";
import ExpenseChart from "./ExpenseChart";
import TransactionModal from "./TransactionModal";
import { Transaction } from "./TransactionItem";
import { ToastContainer, ToastType } from "./ui/toast";

interface FormData {
  type: string;
  amount: string;
  description: string;
  date: string;
}

const defaultFormData: FormData = {
  type: "expense",
  amount: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
};

export default function FinanceTracker() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [mlLoading, setMlLoading] = useState(false);
  const [mlStatus, setMlStatus] = useState<{ category: string; confidence: number } | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<"home" | "chart" | "list">("home");
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([]);
  const [undoStack, setUndoStack] = useState<Array<{ transaction: Transaction; action: "delete" }>>([]);

  // ── Toast Helper ──
  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Fetch Stats ──
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch("/api/transactions/stats");
      const result = await response.json();
      if (result.success) setStats(result.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      showToast("Failed to load statistics. Please refresh the page.", "error");
    }
  }, [showToast]);

  // ── Fetch Transactions ──
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/transactions?filter=${filter}&page=${page}&limit=10`);
      const result = await response.json();
      if (result.success) {
        setTransactions(result.data);
        setTotalPages(result.totalPages || 1);
      } else {
        showToast("Failed to load transactions. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      showToast("Network error. Check your connection and try again.", "error");
    }
    setLoading(false);
  }, [filter, page, showToast]);

  useEffect(() => {
    fetchTransactions();
    fetchStats();
  }, [fetchTransactions, fetchStats]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);

  // ── Preview ML ──
  const previewML = useCallback(async (description: string, type: string) => {
    if (!description || description.trim().length < 3) {
      setMlStatus(null);
      return;
    }
    setMlLoading(true);
    try {
      const res = await fetch("/api/ml/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim(), type }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMlStatus({ category: data.category, confidence: data.confidence });
        }
      }
    } catch {
      setMlStatus(null);
    }
    setMlLoading(false);
  }, []);

  // Debounce preview ML 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.description) {
        previewML(formData.description, formData.type);
      } else {
        setMlStatus(null);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [formData.description, formData.type, previewML]);

  // ── Submit (Create / Update) ──
  const handleSubmit = async () => {
    if (!formData.amount || !formData.description || !formData.date) {
      showToast("Please fill in amount, description, and date.", "error");
      return;
    }

    setLoading(true);

    try {
      const url = editingId ? `/api/transactions/${editingId}` : "/api/transactions";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        const mlInfo =
          result.confidence > 0
            ? ` AI categorized as ${result.category} (${Math.round(result.confidence * 100)}% confidence).`
            : "";
        showToast(
          (editingId ? "Transaction updated successfully." : "Transaction added successfully.") +
            mlInfo,
          "success"
        );
        resetForm();
        setRefreshTrigger((prev) => prev + 1);
        fetchTransactions();
        fetchStats();
      } else {
        showToast(`Failed to save: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
      showToast("Network error. Check your connection and try again.", "error");
    }
    setLoading(false);
  };

  // ── Delete with Undo ──
  const handleDelete = async (id: number) => {
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        // Add to undo stack
        setUndoStack((prev) => [...prev, { transaction, action: "delete" }]);
        
        showToast("Transaction deleted. Undo available for 10 seconds.", "info");
        
        // Auto-clear undo after 10 seconds
        setTimeout(() => {
          setUndoStack((prev) => prev.filter((item) => item.transaction.id !== id));
        }, 10000);

        setRefreshTrigger((prev) => prev + 1);
        fetchTransactions();
        fetchStats();
      } else {
        showToast(`Failed to delete: ${result.message}`, "error");
      }
    } catch {
      showToast("Network error. Check your connection and try again.", "error");
    }
    setLoading(false);
  };

  // ── Undo Delete ──
  const handleUndo = async () => {
    const lastAction = undoStack[undoStack.length - 1];
    if (!lastAction) return;

    setLoading(true);
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: lastAction.transaction.type,
          amount: String(lastAction.transaction.amount),
          description: lastAction.transaction.description,
          date: lastAction.transaction.date,
        }),
      });
      const result = await response.json();

      if (result.success) {
        showToast("Transaction restored successfully.", "success");
        setUndoStack((prev) => prev.slice(0, -1));
        setRefreshTrigger((prev) => prev + 1);
        fetchTransactions();
        fetchStats();
      } else {
        showToast("Failed to restore transaction.", "error");
      }
    } catch {
      showToast("Network error. Failed to restore transaction.", "error");
    }
    setLoading(false);
  };

  // ── Edit ──
  const handleEdit = (transaction: Transaction) => {
    setFormData({
      type: transaction.type,
      amount: String(transaction.amount),
      description: transaction.description,
      date: transaction.date,
    });
    setEditingId(transaction.id);
    setMlStatus({ category: transaction.category, confidence: transaction.confidence });
    setShowModal(true);
  };

  // ── Reset form ──
  const resetForm = () => {
    setShowModal(false);
    setEditingId(null);
    setMlStatus(null);
    setFormData(defaultFormData);
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" style={{ opacity: 0.4 }} />
      
      <div className="relative w-full max-w-6xl mx-auto px-4 pb-28 md:pb-10">
        {/* Desktop Only: Action Bar */}
        <div className="hidden md:flex items-center justify-between gap-2 mb-6 mt-4">
          <div>
            {undoStack.length > 0 && (
              <button
                onClick={handleUndo}
                disabled={loading}
                className="px-4 py-2 border-2 font-bold text-sm transition-all hover-scale uppercase"
                style={{
                  background: '#ffffff',
                  borderColor: 'var(--ink)',
                  boxShadow: 'var(--shadow-sm)',
                  color: 'var(--text-primary)'
                }}
              >
                Undo Delete
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setRefreshTrigger((prev) => prev + 1);
                fetchTransactions();
                fetchStats();
              }}
              disabled={loading}
              className="px-4 py-2 border-2 font-bold text-sm transition-all hover-scale flex items-center gap-2 uppercase"
              style={{
                background: '#ffffff',
                borderColor: 'var(--ink)',
                boxShadow: 'var(--shadow-sm)',
                color: 'var(--text-primary)'
              }}
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="px-4 py-2 border-2 font-bold text-sm transition-all hover-scale flex items-center gap-2 uppercase"
              style={{
                background: 'var(--accent-500)',
                borderColor: 'var(--ink)',
                boxShadow: 'var(--shadow-accent)',
                color: 'var(--ink)'
              }}
            >
              <PlusCircle size={20} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Mobile Only: Tab Content */}
        <div className="block md:hidden mt-4">
          {activeTab === "home" && (
            <div className="space-y-4">
              <StatsCards stats={stats} />
              <TransactionList
                transactions={transactions.slice(0, 5)}
                filter={filter}
                setFilter={setFilter}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
          
          {activeTab === "chart" && (
            <div className="space-y-4">
              <StatsCards stats={stats} />
              <ExpenseChart refreshTrigger={refreshTrigger} />
            </div>
          )}
          
          {activeTab === "list" && (
            <div className="space-y-4">
              <TransactionList
                transactions={transactions}
                filter={filter}
                setFilter={setFilter}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>

        {/* Desktop Only: Full Layout */}
        <div className="hidden md:block">
          <StatsCards stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-6">
            <div className="lg:col-span-1 sticky top-6">
              <ExpenseChart refreshTrigger={refreshTrigger} />
            </div>
            <div className="lg:col-span-2">
              <TransactionList
                transactions={transactions}
                filter={filter}
                setFilter={setFilter}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>

        {/* Modal */}
        <TransactionModal
          showModal={showModal}
          editingId={editingId}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          mlLoading={mlLoading}
          mlStatus={mlStatus}
          onSubmit={handleSubmit}
          onClose={resetForm}
        />
      </div>

      {/* Mobile Only: Bottom Navigation - Futuristic */}
      <nav
        className="block md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: '#ffffff',
          borderTop: '2px solid var(--ink)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}
      >
        <div className="grid grid-cols-4 h-16">
          {/* Home */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex flex-col items-center justify-center gap-1 transition-all"
            style={{
              color: activeTab === "home" ? "var(--ink)" : "var(--text-tertiary)"
            }}
          >
            <Home size={22} strokeWidth={activeTab === "home" ? 2.5 : 2} />
            <span className="text-micro">Home</span>
          </button>
          
          {/* Chart */}
          <button
            onClick={() => setActiveTab("chart")}
            className="flex flex-col items-center justify-center gap-1 transition-all"
            style={{
              color: activeTab === "chart" ? "var(--ink)" : "var(--text-tertiary)"
            }}
          >
            <BarChart3 size={22} strokeWidth={activeTab === "chart" ? 2.5 : 2} />
            <span className="text-micro">Chart</span>
          </button>
          
          {/* List */}
          <button
            onClick={() => setActiveTab("list")}
            className="flex flex-col items-center justify-center gap-1 transition-all"
            style={{
              color: activeTab === "list" ? "var(--ink)" : "var(--text-tertiary)"
            }}
          >
            <List size={22} strokeWidth={activeTab === "list" ? 2.5 : 2} />
            <span className="text-micro">List</span>
          </button>
          
          {/* Add */}
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex flex-col items-center justify-center gap-1 transition-all"
            style={{
              color: "var(--ink)"
            }}
          >
            <PlusCircle size={22} strokeWidth={2.5} />
            <span className="text-micro" style={{ fontWeight: 600 }}>Add</span>
          </button>
        </div>
      </nav>
    </>
  );
}
