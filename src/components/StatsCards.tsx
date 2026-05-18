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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
      {/* Income */}
      <Card className="border-gray-200 hover:border-gray-300 transition-colors">
        <CardContent className="p-5 md:p-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Income</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {formatCurrency(stats.income)}
            </p>
            <div className="h-1 w-16 bg-green-500 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Expense */}
      <Card className="border-gray-200 hover:border-gray-300 transition-colors">
        <CardContent className="p-5 md:p-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Expense</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {formatCurrency(stats.expense)}
            </p>
            <div className="h-1 w-16 bg-red-500 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Balance */}
      <Card className="border-gray-200 hover:border-gray-300 transition-colors bg-gray-50">
        <CardContent className="p-5 md:p-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Balance</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {formatCurrency(stats.balance)}
            </p>
            <div className="h-1 w-16 bg-blue-600 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
