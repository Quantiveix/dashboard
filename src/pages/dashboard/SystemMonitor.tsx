import React, { useState, useEffect } from "react";
import { systemMetrics } from "@/utils/mockData";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const SystemMonitor = () => {
  const initialMetrics: Record<string, number> = {};
  systemMetrics.forEach((m) => { initialMetrics[m.key] = 30 + Math.random() * 40; });

  const [metrics, setMetrics] = useState<Record<string, number>>(initialMetrics);
  const [history, setHistory] = useState<Record<string, number[]>>(() => {
    const h: Record<string, number[]> = {};
    systemMetrics.forEach((m) => {
      h[m.key] = Array.from({ length: 20 }, () => 30 + Math.random() * 40);
    });
    return h;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const next: Record<string, number> = {};
        for (const key of Object.keys(prev)) {
          const delta = (Math.random() - 0.5) * 12;
          next[key] = Math.max(5, Math.min(98, prev[key] + delta));
        }
        return next;
      });
      setHistory((prev) => {
        const next: Record<string, number[]> = {};
        for (const key of Object.keys(prev)) {
          next[key] = [...prev[key].slice(-29), metrics[key]];
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [metrics]);

  const avgUsage = Math.round(Object.values(metrics).reduce((s, v) => s + v, 0) / Object.keys(metrics).length);
  const highCount = Object.values(metrics).filter((v) => v > 80).length;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">System Monitor</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Active Metrics</p>
          <p className="text-lg font-bold text-foreground">{systemMetrics.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Avg Usage</p>
          <p className={`text-lg font-bold ${avgUsage > 70 ? "text-destructive" : "text-primary"}`}>{avgUsage}%</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">High Load</p>
          <p className={`text-lg font-bold ${highCount > 0 ? "text-destructive" : "text-primary"}`}>{highCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Status</p>
          <p className={`text-lg font-bold ${highCount > 2 ? "text-destructive" : "text-primary"}`}>
            {highCount > 2 ? "Critical" : highCount > 0 ? "Warning" : "Healthy"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemMetrics.map((m, i) => {
          const val = Math.round(metrics[m.key] || 50);
          const high = val > 80;
          return (
            <div
              key={m.key}
              className="rounded-lg border border-border bg-card p-4"
              style={{ animation: `slide-up-fade 0.5s ease-out ${i * 0.08}s forwards`, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{m.name}</span>
                <span className={`text-sm font-bold ${high ? "text-destructive" : "text-primary"}`}>{val}{m.unit}</span>
              </div>
              <div className="h-3 rounded-full bg-accent overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${high ? "bg-destructive animate-pulse-red" : "bg-primary"}`}
                  style={{ width: `${val}%` }}
                />
              </div>
              <div className="h-20 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={(history[m.key] || []).map((v, j) => ({ v, i: j }))}>
                    <Line type="monotone" dataKey="v" stroke={high ? "#ef4444" : "#84a794"} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemMonitor;
