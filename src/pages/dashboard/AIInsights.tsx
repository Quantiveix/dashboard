import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { aiInsights } from "@/utils/mockData";
import { Brain, Zap, Filter } from "lucide-react";

const allCategories = ["All", ...new Set(aiInsights.map((i) => i.category))];

const AIInsights = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? aiInsights : aiInsights.filter((i) => i.category === filter);

  const handleAction = (category: string) => {
    switch (category) {
      case "Spending":
        navigate("/dashboard/categories");
        break;
      case "Investing":
        navigate("/dashboard/forecasts");
        break;
      case "Savings":
        navigate("/dashboard/analytics");
        break;
      case "Income":
        navigate("/dashboard/transactions");
        break;
      default:
        navigate("/dashboard/analytics");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-foreground">AI Insights</h1>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
            AI Active
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === c ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Total Insights</p>
          <p className="text-lg font-bold text-foreground">{aiInsights.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Avg Confidence</p>
          <p className="text-lg font-bold text-primary">{Math.round(aiInsights.reduce((s, i) => s + i.confidence, 0) / aiInsights.length)}%</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">High Priority</p>
          <p className="text-lg font-bold text-foreground">{aiInsights.filter((i) => i.confidence >= 90).length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Categories</p>
          <p className="text-lg font-bold text-foreground">{allCategories.length - 1}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((insight, i) => (
          <div
            key={insight.id}
            className="rounded-lg border border-border bg-card p-4 card-hover"
            style={{ animation: `fade-in-bounce 0.6s ease-out ${i * 0.08}s forwards`, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary">{insight.confidence}% confidence</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-accent text-accent-foreground">{insight.category}</span>
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-2">{insight.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{insight.description}</p>
            {/* Confidence bar */}
            <div className="h-1.5 rounded-full bg-accent overflow-hidden mb-3">
              <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${insight.confidence}%` }} />
            </div>
            <button 
              onClick={() => handleAction(insight.category)}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline group/btn"
            >
              <Zap className="h-3 w-3 group-hover/btn:fill-primary transition-colors" />
              {insight.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
