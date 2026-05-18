"use client";

import {
  TrendingUp,
  TrendingDown,
  X,
  DollarSign,
  Calendar,
  FileText,
  RefreshCw,
  BrainCircuit,
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <p className="text-gray-500 text-xs mt-1 flex items-center gap-1.5">
              <BrainCircuit size={12} /> AI will categorize automatically
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Tipe Transaksi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "expense" })}
                className={`p-3 rounded-lg border transition-all text-sm font-medium flex flex-col items-center gap-1.5 ${
                  formData.type === "expense"
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <TrendingDown size={20} />
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "income" })}
                className={`p-3 rounded-lg border transition-all text-sm font-medium flex flex-col items-center gap-1.5 ${
                  formData.type === "income"
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <TrendingUp size={20} />
                Income
              </button>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                Description
              </div>
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder="e.g., lunch at cafe, gas refill, monthly salary..."
            />
            <MLPreview mlLoading={mlLoading} mlStatus={mlStatus} />
          </div>

          {/* Jumlah */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                Amount (IDR)
              </div>
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder="Enter amount"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                Date
              </div>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
              disabled={loading}
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
