"use client";

import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface StatsCardsProps {
  stats: {
    income: number;
    expense: number;
    balance: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    {
      label: "Total Income",
      value: stats.income,
      icon: TrendingUp,
      color: "var(--success-green)",
      bgColor: "oklch(65% 0.15 145 / 0.1)",
    },
    {
      label: "Total Expense",
      value: stats.expense,
      icon: TrendingDown,
      color: "var(--error-red)",
      bgColor: "oklch(60% 0.18 25 / 0.1)",
    },
    {
      label: "Net Balance",
      value: stats.balance,
      icon: Wallet,
      color: stats.balance >= 0 ? "var(--gold-500)" : "var(--error-red)",
      bgColor: stats.balance >= 0 ? "oklch(70% 0.12 85 / 0.1)" : "oklch(60% 0.18 25 / 0.1)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`card-luxury accent-gold animate-slide-up animate-delay-${index * 100 + 100}`}
          >
            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-label mb-3">
                    {card.label}
                  </p>
                  <p className="text-display-number font-mono-tabular">
                    {formatCurrency(card.value)}
                  </p>
                </div>
                
                <div 
                  className="p-3 rounded-lg"
                  style={{ 
                    background: card.bgColor,
                  }}
                >
                  <Icon 
                    size={24} 
                    strokeWidth={2}
                    style={{ color: card.color }}
                  />
                </div>
              </div>
              
              {/* Subtle divider */}
              <div className="divider-luxury my-4" />
              
              {/* Trend indicator */}
              <div className="flex items-center gap-2">
                <div 
                  className="h-1.5 flex-1 rounded-full overflow-hidden"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(Math.abs(card.value) / 10000000 * 100, 100)}%`,
                      background: card.color
                    }}
                  />
                </div>
                <span className="text-caption font-medium">
                  {Math.min(Math.abs(card.value) / 10000000 * 100, 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
