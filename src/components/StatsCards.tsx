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
      label: "TOTAL INCOME",
      value: stats.income,
      icon: TrendingUp,
      color: "var(--neon-green)",
      bgColor: "var(--neon-green-dim)",
      glow: "glow-green",
    },
    {
      label: "TOTAL EXPENSE",
      value: stats.expense,
      icon: TrendingDown,
      color: "var(--neon-red)",
      bgColor: "var(--neon-red-dim)",
      glow: "glow-red",
    },
    {
      label: "NET BALANCE",
      value: stats.balance,
      icon: Wallet,
      color: stats.balance >= 0 ? "var(--cyan-500)" : "var(--neon-red)",
      bgColor: stats.balance >= 0 ? "oklch(70% 0.18 210 / 0.15)" : "var(--neon-red-dim)",
      glow: stats.balance >= 0 ? "glow-cyan" : "glow-red",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`relative overflow-hidden rounded-lg border data-card-hover animate-slide-in-up animate-delay-${index * 100}`}
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-default)',
            }}
          >
            {/* Accent line top */}
            <div 
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: card.color }}
            />
            
            {/* Content */}
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p 
                    className="text-xs font-semibold tracking-wider mb-1"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {card.label}
                  </p>
                  <p 
                    className="text-2xl md:text-3xl font-bold font-mono-tabular"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {formatCurrency(card.value)}
                  </p>
                </div>
                
                <div 
                  className={`p-2.5 rounded-lg ${card.glow}`}
                  style={{ 
                    background: card.bgColor,
                  }}
                >
                  <Icon 
                    size={20} 
                    strokeWidth={2.5}
                    style={{ color: card.color }}
                  />
                </div>
              </div>
              
              {/* Mini chart placeholder - data visualization */}
              <div className="flex items-end gap-1 h-8">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all hover:opacity-80"
                    style={{
                      background: card.color,
                      height: `${Math.random() * 100}%`,
                      opacity: 0.3 + (Math.random() * 0.4),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
