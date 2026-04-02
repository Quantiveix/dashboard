import React, { useState, useMemo } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { Search, ChevronUp, ChevronDown, Download, ArrowUpDown } from "lucide-react";

type SortKey = "date" | "amount" | "description";

const Transactions = () => {
  const { transactions } = useTransactions();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const allCategories = ["All", ...new Set(transactions.map((t) => t.category))];
  const allStatuses = ["All", "Completed", "Pending"];

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (search) list = list.filter((t) => t.description.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter !== "All") list = list.filter((t) => t.category === categoryFilter);
    if (statusFilter !== "All") list = list.filter((t) => t.status === statusFilter);
    list.sort((a, b) => {
      const mul = sortAsc ? 1 : -1;
      if (sortKey === "date") return mul * a.date.localeCompare(b.date);
      if (sortKey === "amount") return mul * (a.amount - b.amount);
      return mul * a.description.localeCompare(b.description);
    });
    return list;
  }, [search, categoryFilter, statusFilter, sortKey, sortAsc]);

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const totalAmount = filtered.reduce((s, t) => s + t.amount, 0);
  const incomeTotal = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenseTotal = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (sortAsc ? <ChevronUp className="h-3 w-3 inline ml-1" /> : <ChevronDown className="h-3 w-3 inline ml-1" />) : null;

  const handleExport = () => {
    const headers = ["Date", "Description", "Category", "Amount", "Status"];
    const rows = filtered.map(t => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`, // escape quotes
      t.category,
      t.amount.toString(),
      t.status
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `quantiveix_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-foreground">Transactions</h1>
        <button 
          onClick={handleExport}
          className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors self-start shadow-sm active:scale-95"
        >
          <Download className="h-3.5 w-3.5 text-primary" /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-[10px] sm:text-xs text-muted-foreground">Net</p>
          <p className={`text-sm sm:text-lg font-bold ${totalAmount >= 0 ? "text-primary" : "text-destructive"}`}>
            {totalAmount >= 0 ? "+" : ""}${Math.abs(totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-[10px] sm:text-xs text-muted-foreground">Income</p>
          <p className="text-sm sm:text-lg font-bold text-primary">${incomeTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-[10px] sm:text-xs text-muted-foreground">Expenses</p>
          <p className="text-sm sm:text-lg font-bold text-foreground">${Math.abs(expenseTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-md border border-border bg-card pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:glow-border transition-all"
            placeholder="Search transactions..."
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
        >
          {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
        >
          {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-2">
        {paged.map((t, i) => (
          <div
            key={t.id}
            className="rounded-lg border border-border bg-card p-3"
            style={{ animation: `slide-up-fade 0.4s ease-out ${i * 0.04}s forwards`, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground truncate flex-1 mr-2">{t.description}</span>
              <span className={`text-sm font-bold ${t.amount >= 0 ? "text-primary" : "text-foreground"}`}>
                {t.amount >= 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{t.date}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground">{t.category}</span>
              <span className={`px-1.5 py-0.5 rounded-full ${t.status === "Completed" ? "bg-primary/10 text-primary" : "bg-muted/30 text-muted-foreground"}`}>
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium cursor-pointer" onClick={() => toggleSort("date")}>Date<SortIcon col="date" /></th>
                <th className="px-4 py-3 text-left font-medium cursor-pointer" onClick={() => toggleSort("description")}>Description<SortIcon col="description" /></th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-right font-medium cursor-pointer" onClick={() => toggleSort("amount")}>Amount<SortIcon col="amount" /></th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((t, i) => (
                <tr
                  key={t.id}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                  style={{ animation: `slide-up-fade 0.4s ease-out ${i * 0.04}s forwards`, opacity: 0 }}
                >
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{t.date}</td>
                  <td className="px-4 py-3 text-foreground">{t.description}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-accent text-accent-foreground">{t.category}</span>
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${t.amount >= 0 ? "text-primary" : "text-foreground"}`}>
                    {t.amount >= 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${t.status === "Completed" ? "bg-primary/10 text-primary" : "bg-muted/30 text-muted-foreground"}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-7 w-7 sm:h-8 sm:w-8 rounded-md text-xs sm:text-sm transition-colors ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-accent"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
