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
      bgColor: "var(--success-green)",
      iconFg: "#ffffff",
    },
    {
      label: "Total Expense",
      value: stats.expense,
      icon: TrendingDown,
      color: "var(--error-red)",
      bgColor: "var(--error-red)",
      iconFg: "#ffffff",
    },
    {
      label: "Net Balance",
      value: stats.balance,
      icon: Wallet,
      color: stats.balance >= 0 ? "var(--accent-500)" : "var(--error-red)",
      bgColor: stats.balance >= 0 ? "var(--accent-500)" : "var(--error-red)",
      iconFg: stats.balance >= 0 ? "var(--ink)" : "#ffffff",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`card accent-bar hover-lift animate-slide-up animate-delay-${index * 100 + 100}`}
          >
            {/* Content */}
            <div className="p-5 md:p-6">
              {/* Label + icon row */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-label min-w-0 truncate">
                  {card.label}
                </p>
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: 38,
                    height: 38,
                    background: card.bgColor,
                    border: '2px solid var(--ink)',
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={2.5}
                    style={{ color: card.iconFg }}
                  />
                </div>
              </div>

              {/* Number — full width, never collides with the icon */}
              <p
                className="font-mono-tabular"
                style={{
                  fontSize: 'clamp(1.4rem, 2vw, 1.95rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {formatCurrency(card.value)}
              </p>

              {/* Subtle divider */}
              <div className="divider my-4" />
              
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
