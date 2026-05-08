"use client";

import { useState, useEffect, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { RefreshCw, PieChart as PieChartIcon } from "lucide-react";

// Professional fintech palette
const COLORS = [
  "#2563eb", // blue-600
  "#059669", // emerald-600
  "#d97706", // amber-600
  "#dc2626", // red-600
  "#7c3aed", // violet-600
  "#0891b2", // cyan-600
  "#e11d48", // rose-600
  "#4f46e5", // indigo-600
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
        <div className="bg-white border border-black/10 p-4 rounded-xl shadow-xl shadow-black/10">
          <p className="text-black/60 text-xs uppercase tracking-wider font-semibold mb-1">{payload[0].name}</p>
          <p className="text-black text-lg font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-black/10 shadow-xl shadow-black/5 p-6 flex flex-col h-[420px] hover-lift animate-fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-black/5 p-2 rounded-lg border border-black/10">
            <PieChartIcon className="text-black" size={18} />
          </div>
          <h2 className="text-xl font-bold text-black">Distribusi Kategori</h2>
        </div>
        <div className="flex gap-1.5 bg-black/5 p-1 rounded-lg border border-black/10">
          <button
            onClick={() => setPeriod("weekly")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              period === "weekly"
                ? "bg-black text-white shadow-sm"
                : "text-black/60 hover:text-black hover:bg-black/5"
            }`}
          >
            7 Hari
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              period === "monthly"
                ? "bg-black text-white shadow-sm"
                : "text-black/60 hover:text-black hover:bg-black/5"
            }`}
          >
            30 Hari
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative w-full">
        {loading ? (
          <div className="flex flex-col items-center">
            <RefreshCw size={32} className="animate-spin text-black mb-3" />
            <p className="text-black/60 text-sm">Memuat grafik...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center">
            <p className="text-black/70 mb-1 font-medium">Belum ada pengeluaran</p>
            <p className="text-black/50 text-xs">dalam periode ini.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="85%"
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              <Legend 
                verticalAlign="bottom" 
                height={40}
                iconType="circle"
                formatter={(value) => <span className="text-black/70 text-sm ml-1.5 font-medium">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
