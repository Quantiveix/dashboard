import React, { useMemo } from "react";
import { kpiData, recentActivity, budgetData as initialBudgetData, goalData } from "@/utils/mockData";
import { useTransactions } from "@/context/TransactionContext";
import { DollarSign, TrendingUp, PiggyBank, BarChart3, Wallet, CreditCard, Shield, ArrowUpDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const Overview = () => {
  const { transactions } = useTransactions();

  const metrics = useMemo(() => {
    const balance = transactions.reduce((s, t) => s + t.amount, 150000); // 150k base + transactions
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlySpend = transactions
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear && t.amount < 0;
      })
      .reduce((s, t) => s + Math.abs(t.amount), 0);

    const monthlyIncome = transactions
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear && t.amount > 0;
      })
      .reduce((s, t) => s + t.amount, 0);

    const savingsRate = monthlyIncome > 0 ? Math.round(((monthlyIncome - monthlySpend) / monthlyIncome) * 100) : 0;

    return { balance, monthlySpend, savingsRate: Math.max(0, savingsRate) };
  }, [transactions]);

  const cards = [
    { title: "Total Balance", value: `$${metrics.balance.toLocaleString()}`, change: "+2.4%", icon: DollarSign, data: kpiData.sparklines.balance, positive: true },
    { title: "Monthly Spend", value: `$${metrics.monthlySpend.toLocaleString()}`, change: "-1.2%", icon: BarChart3, data: kpiData.sparklines.spend, positive: false },
    { title: "Savings Rate", value: `${metrics.savingsRate}%`, change: "+3.1%", icon: PiggyBank, data: kpiData.sparklines.savings, positive: true },
    { title: "Net Worth Trend", value: `+${kpiData.netWorthTrend}%`, change: "+0.8%", icon: TrendingUp, data: kpiData.sparklines.netWorth, positive: true },
    { title: "Investment Return", value: `${kpiData.investmentReturn}%`, change: "+1.5%", icon: Wallet, data: kpiData.sparklines.investment, positive: true },
    { title: "Debt Ratio", value: `${kpiData.debtRatio}%`, change: "-0.6%", icon: CreditCard, data: kpiData.sparklines.debt, positive: true },
    { title: "Credit Score", value: `${kpiData.creditScore}`, change: "+4pts", icon: Shield, data: kpiData.sparklines.credit, positive: true },
    { title: "Cash Flow", value: `$${kpiData.cashFlow.toLocaleString()}`, change: "+4.6%", icon: ArrowUpDown, data: kpiData.sparklines.cashFlow, positive: true },
  ];

  const currentBudgetData = useMemo(() => {
    return initialBudgetData.map(b => {
      const now = new Date();
      const spent = transactions
        .filter(t => t.category === b.category && t.amount < 0 && new Date(t.date).getMonth() === now.getMonth())
        .reduce((s, t) => s + Math.abs(t.amount), 0);
      return { ...b, spent: spent > 0 ? spent : b.spent }; // Fallback to mock if nothing this month
    });
  }, [transactions]);

  const recent = transactions.slice(0, 5).map(t => ({
    id: t.id,
    action: t.amount > 0 ? "Income received" : "Expense added",
    detail: `${t.description} — $${Math.abs(t.amount).toLocaleString()}`,
    time: t.date === new Date().toISOString().split('T')[0] ? "Just now" : t.date
  }));
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Dashboard Overview</h1>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="rounded-lg border border-border bg-card p-3 sm:p-4 card-hover"
            style={{ animation: `slide-up-fade 0.5s ease-out ${i * 0.06}s forwards`, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-primary/10 flex items-center justify-center">
                <card.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span className={`text-xs font-medium ${card.positive ? "text-primary" : "text-destructive"}`}>{card.change}</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{card.title}</p>
            <p className="text-lg sm:text-2xl font-bold text-foreground mt-0.5 sm:mt-1">{card.value}</p>
            <div className="h-8 sm:h-10 mt-2 sm:mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={card.data.map((v, j) => ({ v, i: j }))}>
                  <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Budget Progress */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-4 sm:p-5" style={{ animation: "slide-up-fade 0.5s ease-out 0.5s forwards", opacity: 0 }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Budget vs Actual</h2>
          <div className="space-y-3">
            {currentBudgetData.map((b) => {
              const pct = Math.round((b.spent / b.budget) * 100);
              const over = pct > 90;
              return (
                <div key={b.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground">{b.category}</span>
                    <span className={`text-xs font-medium ${over ? "text-destructive" : "text-muted-foreground"}`}>
                      ${b.spent.toLocaleString()} / ${b.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-accent overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${over ? "bg-destructive" : "bg-primary"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-border bg-card p-4 sm:p-5" style={{ animation: "slide-up-fade 0.5s ease-out 0.6s forwards", opacity: 0 }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recent.map((a) => (
              <div key={a.id} className="flex gap-3 text-xs">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-foreground font-medium">{a.action}</p>
                  <p className="text-muted-foreground truncate">{a.detail}</p>
                  <p className="text-muted-foreground/60">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Goals */}
      <div className="rounded-lg border border-border bg-card p-4 sm:p-5" style={{ animation: "slide-up-fade 0.5s ease-out 0.7s forwards", opacity: 0 }}>
        <h2 className="text-sm font-semibold text-foreground mb-4">Financial Goals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {goalData.map((g) => {
            const pct = Math.round((g.current / g.target) * 100);
            return (
              <div key={g.name} className="rounded-md border border-border p-3">
                <p className="text-xs font-medium text-foreground mb-1">{g.name}</p>
                <p className="text-lg font-bold text-foreground">{pct}%</p>
                <div className="h-1.5 rounded-full bg-accent overflow-hidden mt-2 mb-1.5">
                  <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>${(g.current / 1000).toFixed(0)}k / ${(g.target / 1000).toFixed(0)}k</span>
                  <span>{g.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;
