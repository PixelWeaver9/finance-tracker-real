"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusCircle, RefreshCw } from "lucide-react";
import StatsCards from "./StatsCards";
import TransactionList from "./TransactionList";
import ExpenseChart from "./ExpenseChart";
import TransactionModal from "./TransactionModal";
import { Transaction } from "./TransactionItem";
import { Button } from "./ui/button";

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

  // ── Fetch Stats ──
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch("/api/transactions/stats");
      const result = await response.json();
      if (result.success) setStats(result.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  // ── Fetch Transactions ──
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/transactions?filter=${filter}&page=${page}&limit=10`);
      const result = await response.json();
      if (result.success) {
        setTransactions(result.data);
        setTotalPages(result.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  }, [filter, page]);

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
      alert("Jumlah, deskripsi, dan tanggal harus diisi!");
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
            ? `\nKategori AI: ${result.category} (${Math.round(result.confidence * 100)}%)`
            : "";
        alert(
          (editingId ? "Transaksi berhasil diupdate!" : "Transaksi berhasil ditambahkan!") +
            mlInfo
        );
        resetForm();
        setRefreshTrigger((prev) => prev + 1);
        fetchTransactions();
        fetchStats();
      } else {
        alert("Gagal menyimpan: " + result.message);
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert("Terjadi kesalahan saat menyimpan data!");
    }
    setLoading(false);
  };

  // ── Delete ──
  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus transaksi ini?")) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        setRefreshTrigger((prev) => prev + 1);
        fetchTransactions();
        fetchStats();
      } else {
        alert("Gagal menghapus: " + result.message);
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus data!");
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
    <div className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
      {/* Action Bar */}
      <div className="flex items-center justify-end gap-2 mb-6">
        <Button
          variant="outline"
          onClick={() => {
            setRefreshTrigger((prev) => prev + 1);
            fetchTransactions();
            fetchStats();
          }}
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <PlusCircle size={20} />
          Tambah
        </Button>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1 sticky top-6">
          <ExpenseChart refreshTrigger={refreshTrigger} />
        </div>
        <div className="lg:col-span-2">
          {/* Transaction List */}
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
  );
}
