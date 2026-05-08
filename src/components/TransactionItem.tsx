"use client";

import { TrendingUp, TrendingDown, Edit2, Trash2, BrainCircuit } from "lucide-react";

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  category: string;
  confidence: number;
  ml_source: string;
  description: string;
  date: string;
  created_at: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  loading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionItem({
  transaction,
  loading,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border border-black/10 rounded-xl hover:bg-white/80 hover:border-black/20 transition-all group hover-lift">
      <div className="flex items-center gap-4">
        <div
          className={`p-2.5 rounded-xl ${
            transaction.type === "income" ? "bg-black/5 border border-black/10" : "bg-black/5 border border-black/10"
          }`}
        >
          {transaction.type === "income" ? (
            <TrendingUp className="text-black" size={20} />
          ) : (
            <TrendingDown className="text-black" size={20} />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-black">{transaction.category}</h3>
            {transaction.confidence > 0 && (
              <span
                className="text-[10px] px-2 py-0.5 rounded border flex items-center gap-1 bg-black/5 text-black/60 border-black/10"
                title={`AI Confidence: ${Math.round(transaction.confidence * 100)}%`}
              >
                <BrainCircuit size={10} />
                AI-Assigned
              </span>
            )}
          </div>
          <p className="text-sm text-black/70">{transaction.description}</p>
          <p className="text-xs text-black/50 mt-0.5">{formatDate(transaction.date)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p
          className={`text-lg font-bold ${
            transaction.type === "income" ? "text-black" : "text-black"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(transaction)}
            className="p-1.5 text-black/50 hover:text-black hover:bg-black/5 rounded transition-all"
            disabled={loading}
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-1.5 text-black/50 hover:text-black hover:bg-black/5 rounded transition-all"
            disabled={loading}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
