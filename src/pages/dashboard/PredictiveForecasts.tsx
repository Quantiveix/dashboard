import React, { useState } from "react";
import { forecastData } from "@/utils/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from "recharts";

const tooltipStyle = { backgroundColor: "hsl(0,0%,5%)", border: "1px solid hsl(0,0%,14%)", borderRadius: "8px", color: "#fff" };

const PredictiveForecasts = () => {
  const [view, setView] = useState<"monthly" | "yearly">("monthly");
  const data = view === "monthly" ? forecastData.monthly : forecastData.yearly;
  const xKey = view === "monthly" ? "month" : "year";

  const lastActual = data.filter((d) => d.actual !== null).at(-1);
  const nextProjected = data.find((d) => d.actual === null);
  const accuracy = lastActual ? Math.round((1 - Math.abs(lastActual.actual! - lastActual.projected) / lastActual.actual!) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-foreground">Predictive Forecasts</h1>
        <div className="flex rounded-md border border-border overflow-hidden self-start">
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === "monthly" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("yearly")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === "yearly" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Model Accuracy</p>
          <p className="text-lg font-bold text-primary">{accuracy}%</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Last Actual</p>
          <p className="text-lg font-bold text-foreground">${lastActual ? (lastActual.actual! / 1000).toFixed(1) : 0}k</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Next Projected</p>
          <p className="text-lg font-bold text-foreground">${nextProjected ? (nextProjected.projected / 1000).toFixed(1) : 0}k</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Data Points</p>
          <p className="text-lg font-bold text-foreground">{data.length}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-3 sm:p-4" style={{ animation: "slide-up-fade 0.5s ease-out forwards" }}>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,14%)" />
            <XAxis dataKey={xKey} stroke="hsl(184,10%,40%)" fontSize={11} />
            <YAxis stroke="hsl(184,10%,40%)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="upper" stroke="none" fill="#84a794" fillOpacity={0.1} />
            <Area type="monotone" dataKey="lower" stroke="none" fill="#020202" fillOpacity={1} />
            <Line type="monotone" dataKey="projected" stroke="#b2c8bc" strokeWidth={2} strokeDasharray="6 3" dot={false} />
            <Line type="monotone" dataKey="actual" stroke="#84a794" strokeWidth={2} dot={{ r: 4, fill: "#84a794" }} connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-primary inline-block" /> Actual</span>
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-secondary inline-block border-dashed" /> Projected</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-4 bg-primary/10 inline-block rounded" /> Confidence Band</span>
        </div>
      </div>

      {/* Data table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden" style={{ animation: "slide-up-fade 0.5s ease-out 0.1s forwards", opacity: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">{view === "monthly" ? "Month" : "Year"}</th>
                <th className="px-4 py-3 text-right font-medium">Actual</th>
                <th className="px-4 py-3 text-right font-medium">Projected</th>
                <th className="px-4 py-3 text-right font-medium hidden sm:table-cell">Variance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                const variance = d.actual ? ((d.actual - d.projected) / d.projected * 100).toFixed(1) : null;
                return (
                  <tr key={d[xKey as keyof typeof d] as string} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-2.5 text-foreground">{d[xKey as keyof typeof d]}</td>
                    <td className="px-4 py-2.5 text-right text-foreground">{d.actual ? `$${(d.actual / 1000).toFixed(1)}k` : "—"}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">${(d.projected / 1000).toFixed(1)}k</td>
                    <td className={`px-4 py-2.5 text-right hidden sm:table-cell ${variance && parseFloat(variance) >= 0 ? "text-primary" : "text-destructive"}`}>
                      {variance ? `${parseFloat(variance) >= 0 ? "+" : ""}${variance}%` : "—"}
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

export default PredictiveForecasts;
