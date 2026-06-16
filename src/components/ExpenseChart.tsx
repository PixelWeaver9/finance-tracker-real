"use client";

import { useState, useEffect, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { RefreshCw } from "lucide-react";

// Brutalist categorical palette — bold, high-contrast on paper
const COLORS = [
  "#f2401f", // expense red
  "#2b57f0", // cat blue
  "#16120b", // ink
  "#ffb200", // amber
  "#1e8c4e", // income green
  "#7c3aed", // violet
  "#0891b2", // teal
  "#db2777", // pink
];

interface ChartData {
  name: string;
  value: number;
}

interface ExpenseChartProps {
  refreshTrigger: number;
}

export default function ExpenseChart({ refreshTrigger }: ExpenseChartProps) {
  const [data, setData] = useState<ChartData[]>([]);
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");
  const [loading, setLoading] = useState(false);

  const fetchChartData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/transactions/charts?period=${period}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
    setLoading(false);
  }, [period]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData, refreshTrigger]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="card p-3">
          <p className="text-caption mb-1">{payload[0].name}</p>
          <p className="text-body-emphasis font-mono-tabular">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-5 md:p-6 flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          color: 'var(--text-primary)'
        }}>
          Category Distribution
        </h2>
        <div className="flex" style={{ border: '2px solid var(--ink)' }}>
          <button
            onClick={() => setPeriod("weekly")}
            className="px-3 py-1.5 transition-all uppercase"
            style={{
              background: period === "weekly" ? 'var(--accent-500)' : '#ffffff',
              color: 'var(--ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-wide)',
              opacity: period === "weekly" ? 1 : 0.5,
            }}
          >
            7 Days
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className="px-3 py-1.5 transition-all uppercase"
            style={{
              background: period === "monthly" ? 'var(--accent-500)' : '#ffffff',
              color: 'var(--ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-wide)',
              opacity: period === "monthly" ? 1 : 0.5,
              borderLeft: '2px solid var(--ink)',
            }}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <RefreshCw size={28} className="animate-spin" style={{ color: 'var(--text-tertiary)' }} />
            <p className="text-caption">Loading...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center">
            <p className="text-body-emphasis">No expenses yet</p>
            <p className="text-caption mt-1">in this period</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
                stroke="#16120b"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="hover:opacity-80 transition-opacity outline-none" 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-caption font-medium ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
