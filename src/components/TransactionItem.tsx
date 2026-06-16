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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 transition-all group hover-lift gap-3 sm:gap-0"
      style={{
        background: '#ffffff',
        borderColor: 'var(--ink)'
      }}
    >
      <div className="flex items-start sm:items-center gap-4">
        <div
          className="shrink-0 p-2.5"
          style={{
            background: transaction.type === "income" ? 'var(--success-green)' : 'var(--error-red)',
            border: '2px solid var(--ink)',
          }}
        >
          {transaction.type === "income" ? (
            <TrendingUp size={20} strokeWidth={2.5} style={{ color: '#ffffff' }} />
          ) : (
            <TrendingDown size={20} strokeWidth={2.5} style={{ color: '#ffffff' }} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-body-emphasis truncate">{transaction.category}</h3>
            {transaction.confidence > 0 && (
              <span
                className="shrink-0 text-micro px-2 py-0.5 border flex items-center gap-1 whitespace-nowrap"
                style={{
                  background: 'var(--accent-500)',
                  border: '1.5px solid var(--ink)',
                  color: 'var(--ink)'
                }}
                title={`AI Confidence: ${Math.round(transaction.confidence * 100)}%`}
              >
                <BrainCircuit size={10} />
                AI
              </span>
            )}
          </div>
          <p className="text-caption truncate">{transaction.description}</p>
          <p className="text-micro mt-0.5">{formatDate(transaction.date)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 pl-[3.25rem] sm:pl-0 mt-1 sm:mt-0">
        <p
          className="font-mono-tabular whitespace-nowrap"
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            color: transaction.type === "income" ? 'var(--success-green)' : 'var(--error-red)'
          }}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>
        <div className="flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(transaction)}
            className="p-1.5 rounded transition-all hover-scale"
            style={{
              color: 'var(--text-tertiary)'
            }}
            disabled={loading}
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-1.5 rounded transition-all hover-scale"
            style={{
              color: 'var(--text-tertiary)'
            }}
            disabled={loading}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
