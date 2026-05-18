"use client";

import { RefreshCw, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import TransactionItem, { Transaction } from "./TransactionItem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

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
  return (
    <Card className="flex-1 flex flex-col min-h-[500px] border-black/15">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-2xl">Transaction History</CardTitle>
          <div className="flex gap-2">
            {(["all", "income", "expense"] as const).map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                className="min-w-[90px]"
              >
                {f === "all" ? "All" : f === "income" ? "Income" : "Expense"}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pt-0">
        {loading ? (
          <div className="text-center py-20 animate-fade-in">
            <RefreshCw size={40} className="animate-spin text-gray-900 mx-auto mb-4" />
            <p className="text-gray-600 text-sm">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center h-full animate-fade-in">
            <div className="bg-gray-50 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-200">
              <FileText size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold text-lg">No transactions yet</p>
            <p className="text-gray-500 text-sm mt-2">
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
                  style={{ animationDelay: `${index * 50}ms` }}
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
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-medium">
                  Page <span className="text-gray-900">{page}</span> of <span className="text-gray-900">{totalPages}</span>
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
