import React from "react";
import { categories, categoryMonthly } from "@/utils/mockData";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const tooltipStyle = { 
  backgroundColor: "#020202", 
  border: "1px solid hsl(0,0%,14%)", 
  borderRadius: "8px", 
  padding: "8px 12px",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
};
const itemStyle = { color: "#ffffff", fontSize: "12px", fontWeight: "500" };

const totalSpend = categories.reduce((s, c) => s + c.value, 0);

const SpendingCategories = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Spending Categories</h1>

      {/* Category summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.slice(0, 5).map((c, i) => {
          const pct = Math.round((c.value / totalSpend) * 100);
          return (
            <div key={c.name} className="rounded-lg border border-border bg-card p-3" style={{ animation: `slide-up-fade 0.4s ease-out ${i * 0.06}s forwards`, opacity: 0 }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-xs text-muted-foreground truncate">{c.name}</span>
              </div>
              <p className="text-sm font-bold text-foreground">${c.value.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">{pct}% of total</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-lg border border-border bg-card p-3 sm:p-4" style={{ animation: "slide-up-fade 0.5s ease-out forwards" }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Breakdown by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categories} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" animationDuration={1500}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {categories.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} itemStyle={itemStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
            {categories.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 sm:p-4" style={{ animation: "slide-up-fade 0.5s ease-out 0.1s forwards", opacity: 0 }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Month-over-Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,14%)" />
              <XAxis dataKey="month" stroke="hsl(184,10%,40%)" fontSize={11} />
              <YAxis stroke="hsl(184,10%,40%)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} itemStyle={itemStyle} />
              <Legend />
              <Bar dataKey="Housing" fill="#84a794" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Transport" fill="#b2c8bc" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Groceries" fill="#b2c2c3" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Entertainment" fill="#5a8a6e" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Dining" fill="#9dbfad" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Shopping" fill="#c4d8cc" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed category table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden" style={{ animation: "slide-up-fade 0.5s ease-out 0.2s forwards", opacity: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-right font-medium">% of Total</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => {
                const pct = Math.round((c.value / totalSpend) * 100);
                return (
                  <tr key={c.name} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="text-foreground">{c.name}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-foreground font-medium">${c.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{pct}%</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="h-2 rounded-full bg-accent overflow-hidden w-32">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: c.color }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpendingCategories;
