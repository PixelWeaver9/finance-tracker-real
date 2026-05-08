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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-zinc-100">
              {editingId ? "Edit Transaksi" : "Tambah Transaksi"}
            </h2>
            <p className="text-zinc-500 text-xs mt-1 flex items-center gap-1.5">
              <BrainCircuit size={12} /> Kategori dideteksi otomatis oleh AI
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-all text-zinc-500 hover:text-zinc-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Tipe Transaksi */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Tipe Transaksi
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "expense" })}
                className={`p-3 rounded-xl border transition-all text-sm font-medium flex flex-col items-center gap-1.5 ${
                  formData.type === "expense"
                    ? "border-rose-500 bg-rose-500/10 text-rose-500"
                    : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700"
                }`}
              >
                <TrendingDown size={20} />
                Pengeluaran
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "income" })}
                className={`p-3 rounded-xl border transition-all text-sm font-medium flex flex-col items-center gap-1.5 ${
                  formData.type === "income"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                    : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700"
                }`}
              >
                <TrendingUp size={20} />
                Pemasukan
              </button>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                Deskripsi Transaksi
              </div>
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              placeholder="contoh: makan bakso, isi bensin, gaji bulanan..."
            />
            <MLPreview mlLoading={mlLoading} mlStatus={mlStatus} />
          </div>

          {/* Jumlah */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                Jumlah (IDR)
              </div>
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              placeholder="Masukkan jumlah"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                Tanggal
              </div>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-xl hover:bg-zinc-800 transition-all text-sm font-medium"
              disabled={loading}
            >
              Batal
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-md shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Menyimpan...
                </>
              ) : (
                <>{editingId ? "Update" : "Simpan"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
