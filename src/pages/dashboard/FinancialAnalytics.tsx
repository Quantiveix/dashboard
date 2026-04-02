import React, { useState } from "react";
import { analyticsData } from "@/utils/mockData";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

const tooltipStyle = { backgroundColor: "hsl(0,0%,5%)", border: "1px solid hsl(0,0%,14%)", borderRadius: "8px", color: "#fff" };

const FinancialAnalytics = () => {
  const [period, setPeriod] = useState<"monthly" | "weekly">("monthly");
  const data = period === "monthly" ? analyticsData.monthly : analyticsData.weeklyTrend;
  const xKey = period === "monthly" ? "month" : "week";

  const totalIncome = analyticsData.monthly.reduce((s, d) => s + d.income, 0);
  const totalExpenses = analyticsData.monthly.reduce((s, d) => s + d.expenses, 0);
  const totalSavings = analyticsData.monthly.reduce((s, d) => s + d.savings, 0);
  const avgMonthly = Math.round(totalIncome / 12);

  const summaryCards = [
    { label: "Annual Income", value: `$${totalIncome.toLocaleString()}` },
    { label: "Annual Expenses", value: `$${totalExpenses.toLocaleString()}` },
    { label: "Annual Savings", value: `$${totalSavings.toLocaleString()}` },
    { label: "Avg Monthly Income", value: `$${avgMonthly.toLocaleString()}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-foreground">Financial Analytics</h1>
        <div className="flex rounded-md border border-border overflow-hidden self-start">
          {(["monthly", "weekly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${period === p ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((c, i) => (
          <div key={c.label} className="rounded-lg border border-border bg-card p-3 sm:p-4" style={{ animation: `slide-up-fade 0.4s ease-out ${i * 0.08}s forwards`, opacity: 0 }}>
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className="text-base sm:text-lg font-bold text-foreground mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Line Chart */}
        <div className="rounded-lg border border-border bg-card p-3 sm:p-4" style={{ animation: "slide-up-fade 0.5s ease-out forwards" }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Income vs Expenses (Line)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,14%)" />
              <XAxis dataKey={xKey} stroke="hsl(184,10%,40%)" fontSize={11} />
              <YAxis stroke="hsl(184,10%,40%)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#84a794" strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} />
              <Line type="monotone" dataKey="expenses" stroke="#b2c2c3" strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="rounded-lg border border-border bg-card p-3 sm:p-4" style={{ animation: "slide-up-fade 0.5s ease-out 0.1s forwards", opacity: 0 }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Income vs Expenses (Bar)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,14%)" />
              <XAxis dataKey={xKey} stroke="hsl(184,10%,40%)" fontSize={11} />
              <YAxis stroke="hsl(184,10%,40%)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="income" fill="#84a794" radius={[4, 4, 0, 0]} animationDuration={1500} />
              <Bar dataKey="expenses" fill="#b2c2c3" radius={[4, 4, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Savings & Investments Area Chart (monthly only) */}
      {period === "monthly" && (
        <div className="rounded-lg border border-border bg-card p-3 sm:p-4" style={{ animation: "slide-up-fade 0.5s ease-out 0.2s forwards", opacity: 0 }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Savings & Investment Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,14%)" />
              <XAxis dataKey="month" stroke="hsl(184,10%,40%)" fontSize={11} />
              <YAxis stroke="hsl(184,10%,40%)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Area type="monotone" dataKey="savings" stroke="#84a794" fill="#84a794" fillOpacity={0.15} strokeWidth={2} animationDuration={1500} />
              <Area type="monotone" dataKey="investments" stroke="#b2c8bc" fill="#b2c8bc" fillOpacity={0.1} strokeWidth={2} animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default FinancialAnalytics;
