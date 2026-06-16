"use client";

import { RefreshCw, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import TransactionItem, { Transaction } from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  filter: string;
  setFilter: (filter: string) => void;
  loading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TransactionList({
  transactions,
  filter,
  setFilter,
  loading,
  onEdit,
  onDelete,
  page,
  totalPages,
  onPageChange,
}: TransactionListProps) {
  const filters = ["all", "income", "expense"] as const;

  return (
    <div className="card flex-1 flex flex-col min-h-[500px] p-5 md:p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
        <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)' }}>
          Transaction History
        </h2>
        <div className="flex" style={{ border: '2px solid var(--ink)' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 transition-all uppercase"
              style={{
                background: filter === f ? 'var(--accent-500)' : '#ffffff',
                color: 'var(--ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-wide)',
                opacity: filter === f ? 1 : 0.5,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="text-center py-20 animate-fade-in flex flex-col items-center justify-center flex-1">
            <RefreshCw size={36} className="animate-spin mx-auto mb-4" style={{ color: 'var(--ink)' }} />
            <p className="text-caption">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center flex-1 animate-fade-in">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border"
              style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-default)' }}
            >
              <FileText size={32} style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <p className="text-body-emphasis text-lg">No transactions yet</p>
            <p className="text-caption mt-2">
              Click &quot;Add Transaction&quot; to get started
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 flex-1">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <TransactionItem
                    transaction={transaction}
                    loading={loading}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <p className="text-caption">
                  Page <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{page}</span> of{" "}
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{totalPages}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-2 border-2 text-sm font-bold uppercase transition-all hover-scale flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none"
                    style={{ borderColor: 'var(--ink)', background: '#ffffff', boxShadow: 'var(--shadow-sm)', color: 'var(--text-primary)' }}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                  <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-2 border-2 text-sm font-bold uppercase transition-all hover-scale flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none"
                    style={{ borderColor: 'var(--ink)', background: '#ffffff', boxShadow: 'var(--shadow-sm)', color: 'var(--text-primary)' }}
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
