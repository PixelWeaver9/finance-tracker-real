import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface StatsProps {
  stats: {
    income: number;
    expense: number;
    balance: number;
  };
}

export default function StatsCards({ stats }: StatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Pemasukan */}
      <Card className="relative overflow-hidden group border-black/15">
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className="p-8 relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-black" />
                <span className="text-black/60 text-xs font-semibold uppercase tracking-wider">Pemasukan</span>
              </div>
              <p className="text-4xl font-bold text-black tracking-tight">
                {formatCurrency(stats.income)}
              </p>
            </div>
            <div className="bg-black/5 backdrop-blur-sm p-3 rounded-lg border border-black/10">
              <TrendingUp size={24} className="text-black" />
            </div>
          </div>
          <div className="h-0.5 w-full bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: '70%' }} />
          </div>
        </CardContent>
      </Card>

      {/* Pengeluaran */}
      <Card className="relative overflow-hidden group border-black/15">
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className="p-8 relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-black/60" />
                <span className="text-black/60 text-xs font-semibold uppercase tracking-wider">Pengeluaran</span>
              </div>
              <p className="text-4xl font-bold text-black tracking-tight">
                {formatCurrency(stats.expense)}
              </p>
            </div>
            <div className="bg-black/5 backdrop-blur-sm p-3 rounded-lg border border-black/10">
              <TrendingDown size={24} className="text-black" />
            </div>
          </div>
          <div className="h-0.5 w-full bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-black/60 rounded-full transition-all duration-1000" style={{ width: '45%' }} />
          </div>
        </CardContent>
      </Card>

      {/* Saldo */}
      <Card className="relative overflow-hidden group border-black/20 bg-black/5">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className="p-8 relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-black" />
                <span className="text-black/80 text-xs font-semibold uppercase tracking-wider">Saldo</span>
              </div>
              <p className="text-4xl font-bold text-black tracking-tight">
                {formatCurrency(stats.balance)}
              </p>
            </div>
            <div className="bg-black/10 backdrop-blur-sm p-3 rounded-lg border border-black/15">
              <Wallet size={24} className="text-black" />
            </div>
          </div>
          <div className="h-0.5 w-full bg-black/20 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: '85%' }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
