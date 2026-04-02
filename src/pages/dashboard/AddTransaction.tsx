import React, { useState } from "react";
import { Check, DollarSign, Calendar, FileText, Tag, StickyNote } from "lucide-react";
import { useTransactions } from "@/context/TransactionContext";

const categoryOptions = ["Income", "Groceries", "Entertainment", "Utilities", "Transport", "Dining", "Shopping", "Health", "Insurance", "Subscriptions", "Other"];

const AddTransaction = () => {
  const { addTransaction, transactions } = useTransactions();
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], description: "", category: "", amount: "", notes: "", type: "expense" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shaking, setShaking] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.date) errs.date = "Required";
    if (!form.description) errs.description = "Required";
    if (!form.category) errs.category = "Required";
    const amountVal = Number(form.amount);
    if (!form.amount || isNaN(amountVal)) errs.amount = "Must be a valid number";
    else if (amountVal <= 0) errs.amount = "Must be positive";
    return errs;
  };

  const recentAdditions = transactions.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    
    // Save to global state
    const amountNum = Number(form.amount);
    addTransaction({
      date: form.date,
      description: form.description,
      category: form.category,
      amount: form.type === "expense" ? -amountNum : amountNum,
      status: "Completed"
    });
    
    setErrors({});
    setSuccess(true);
    setForm({ date: new Date().toISOString().split('T')[0], description: "", category: "", amount: "", notes: "", type: "expense" });
    setTimeout(() => setSuccess(false), 3000);
  };

  const inputClass = (field: string) =>
    `w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
      errors[field] ? "border-destructive" : "border-border focus:border-primary focus:glow-border"
    }`;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Add Transaction</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 rounded-lg border border-border bg-card p-4 sm:p-6 ${shaking ? "animate-shake" : ""}`}>
          {success && (
            <div className="flex items-center gap-2 mb-4 p-3 rounded-md bg-primary/10 text-primary text-sm animate-slide-up-fade">
              <Check className="h-4 w-4" /> Transaction added successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Transaction Type</label>
              <div className="flex rounded-md border border-border overflow-hidden">
                {["expense", "income"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, type: t })}
                    className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                      form.type === t ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Date
                </label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass("date")} />
                {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" /> Amount
                </label>
                <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputClass("amount")} placeholder="0.00" />
                {errors.amount && <p className="text-xs text-destructive mt-1">{errors.amount}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" /> Description
              </label>
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass("description")} placeholder="Transaction description" />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" /> Category
              </label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass("category")}>
                <option value="">Select category</option>
                {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                <StickyNote className="h-3.5 w-3.5 text-muted-foreground" /> Notes (optional)
              </label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className={inputClass("notes")} placeholder="Additional notes..." />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all"
            >
              Add Transaction
            </button>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4" style={{ animation: "slide-up-fade 0.5s ease-out 0.1s forwards", opacity: 0 }}>
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Tips</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span> Use negative amounts for expenses</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Select the correct category for better insights</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Add notes for recurring transactions</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Date defaults to today if not set</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4" style={{ animation: "slide-up-fade 0.5s ease-out 0.2s forwards", opacity: 0 }}>
            <h3 className="text-sm font-semibold text-foreground mb-3">Recent Additions</h3>
            <div className="space-y-2 text-xs">
              {recentAdditions.map((t) => (
                <div key={t.id} className="flex justify-between items-center text-muted-foreground animate-slide-up-fade">
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium truncate max-w-[100px]">{t.description}</span>
                    <span className="text-[10px] text-muted-foreground/60">{t.date}</span>
                  </div>
                  <span className={t.amount >= 0 ? "text-primary" : "text-foreground"}>
                    {t.amount >= 0 ? "+" : ""}${Math.abs(t.amount).toLocaleString()}
                  </span>
                </div>
              ))}
              {recentAdditions.length === 0 && <p className="text-center py-4 text-muted-foreground italic">No recent transactions</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
