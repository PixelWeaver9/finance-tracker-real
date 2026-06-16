"use client";

import {
  TrendingUp,
  TrendingDown,
  X,
  DollarSign,
  Calendar,
  FileText,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import MLPreview from "./MLPreview";

interface FormData {
  type: string;
  amount: string;
  description: string;
  date: string;
}

interface TransactionModalProps {
  showModal: boolean;
  editingId: number | null;
  formData: FormData;
  setFormData: (data: FormData) => void;
  loading: boolean;
  mlLoading: boolean;
  mlStatus: { category: string; confidence: number } | null;
  onSubmit: () => void;
  onClose: () => void;
}

const fieldClass = "field px-4 py-3 text-sm";

export default function TransactionModal({
  showModal,
  editingId,
  formData,
  setFormData,
  loading,
  mlLoading,
  mlStatus,
  onSubmit,
  onClose,
}: TransactionModalProps) {
  if (!showModal) return null;

  const isExpense = formData.type === "expense";
  const isIncome = formData.type === "income";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-luxury animate-fade-in"
      style={{ background: 'oklch(8% 0.01 250 / 0.6)' }}
      onClick={onClose}
    >
      <div
        className="card accent-bar w-full max-w-md p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--text-primary)' }}>
              {editingId ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <p className="text-caption mt-1 flex items-center gap-1.5">
              <Sparkles size={12} style={{ color: 'var(--ink)' }} /> AI will categorize automatically
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all hover-scale"
            style={{ color: 'var(--text-tertiary)', background: 'var(--bg-tertiary)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Transaction Type */}
          <div>
            <label className="text-label block mb-2">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "expense" })}
                className="p-3 border-2 transition-all text-sm font-bold uppercase flex flex-col items-center gap-1.5"
                style={{
                  borderColor: isExpense ? 'var(--error-red)' : 'var(--border-default)',
                  background: isExpense ? 'oklch(65% 0.19 18 / 0.12)' : 'var(--bg-tertiary)',
                  color: isExpense ? 'var(--error-red)' : 'var(--text-secondary)',
                }}
              >
                <TrendingDown size={20} />
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "income" })}
                className="p-3 border-2 transition-all text-sm font-bold uppercase flex flex-col items-center gap-1.5"
                style={{
                  borderColor: isIncome ? 'var(--success-green)' : 'var(--border-default)',
                  background: isIncome ? 'oklch(74% 0.16 158 / 0.12)' : 'var(--bg-tertiary)',
                  color: isIncome ? 'var(--success-green)' : 'var(--text-secondary)',
                }}
              >
                <TrendingUp size={20} />
                Income
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-label block mb-2 flex items-center gap-2">
              <FileText size={14} /> Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={fieldClass}
              placeholder="e.g., lunch at cafe, gas refill, monthly salary..."
            />
            <MLPreview mlLoading={mlLoading} mlStatus={mlStatus} />
          </div>

          {/* Amount */}
          <div>
            <label className="text-label block mb-2 flex items-center gap-2">
              <DollarSign size={14} /> Amount (IDR)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className={`${fieldClass} font-mono-tabular`}
              placeholder="Enter amount"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-label block mb-2 flex items-center gap-2">
              <Calendar size={14} /> Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={fieldClass}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 transition-all hover-scale text-sm font-bold uppercase disabled:opacity-50"
              style={{ borderColor: 'var(--ink)', background: '#ffffff', boxShadow: 'var(--shadow-sm)', color: 'var(--text-primary)' }}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 transition-all hover-scale flex items-center justify-center gap-2 text-sm font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'var(--accent-500)', borderColor: 'var(--ink)', boxShadow: 'var(--shadow-accent)', color: 'var(--ink)' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                <>{editingId ? "Update" : "Save"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
