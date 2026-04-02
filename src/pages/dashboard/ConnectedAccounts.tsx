import React, { useState } from "react";
import { connectedAccounts as initialAccounts } from "@/utils/mockData";
import { Plus, Building, CreditCard, TrendingUp, AlertCircle, CheckCircle2, Clock, RefreshCw, Trash2, Loader2, Link2, Landmark } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const iconMap: Record<string, React.ElementType> = {
  "Bank Account": Building,
  "Credit Card": CreditCard,
  "Investment": TrendingUp,
};

const statusConfig = {
  connected: { icon: CheckCircle2, class: "text-primary bg-primary/10", label: "Connected" },
  pending: { icon: Clock, class: "text-muted-foreground bg-muted/20", label: "Pending" },
  error: { icon: AlertCircle, class: "text-destructive bg-destructive/10", label: "Error" },
};

const ConnectedAccounts = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [syncingId, setSyncingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);
  
  const [newAcc, setNewAcc] = useState({
    name: "",
    institution: "",
    type: "Bank Account" as "Bank Account" | "Credit Card" | "Investment",
    amount: "",
  });

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const connectedCount = accounts.filter((a) => a.status === "connected").length;
  const issuesCount = accounts.filter((a) => a.status === "error").length;

  const handleSync = (id: number) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setAccounts(prev => 
        prev.map(a => a.id === id ? { ...a, lastSync: "Just now", status: "connected" as const } : a)
      );
    }, 1500);
  };

  const confirmDelete = () => {
    if (accountToDelete !== null) {
      setAccounts(prev => prev.filter(a => a.id !== accountToDelete));
      setAccountToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setTimeout(() => {
      const account = {
        id: Math.max(0, ...accounts.map(a => a.id)) + 1,
        name: newAcc.name || "New Connection",
        type: newAcc.type,
        institution: newAcc.institution || "Manual Integration",
        status: "connected" as const,
        lastSync: "Just now",
        balance: parseFloat(newAcc.amount) || 0
      };
      setAccounts([account, ...accounts]);
      setIsAdding(false);
      setIsAddModalOpen(false);
      setNewAcc({ name: "", institution: "", type: "Bank Account", amount: "" });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-foreground">Connected Accounts</h1>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 active:scale-95 transition-all self-start shadow-sm">
              <Plus className="h-4 w-4" /> Add Source
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card border-border shadow-2xl">
            <form onSubmit={handleAddSource}>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-primary" />
                  Link New Account
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-xs leading-relaxed">
                  Enter your current account details to securely sync with your dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs font-semibold text-foreground tracking-tight">Custom Account Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. My Main Savings" 
                    value={newAcc.name}
                    onChange={(e) => setNewAcc({ ...newAcc, name: e.target.value })}
                    className="bg-accent/30 border-border focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="inst" className="text-xs font-semibold text-foreground tracking-tight">Institution</Label>
                    <Input 
                      id="inst" 
                      placeholder="Chase, Amex..." 
                      value={newAcc.institution}
                      onChange={(e) => setNewAcc({ ...newAcc, institution: e.target.value })}
                      className="bg-accent/30 border-border"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount" className="text-xs font-semibold text-foreground tracking-tight">Current Balance</Label>
                    <Input 
                      id="amount" 
                      type="number"
                      placeholder="0.00" 
                      value={newAcc.amount}
                      onChange={(e) => setNewAcc({ ...newAcc, amount: e.target.value })}
                      className="bg-accent/30 border-border font-mono"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-xs font-semibold text-foreground tracking-tight">Account Type</Label>
                  <Select 
                    value={newAcc.type} 
                    onValueChange={(v: any) => setNewAcc({ ...newAcc, type: v })}
                  >
                    <SelectTrigger className="bg-accent/30 border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Bank Account">Bank Account</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Investment">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <button 
                  type="submit" 
                  disabled={isAdding}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all shadow-lg active:scale-95"
                >
                  {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Connect"}
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Total Accounts</p>
          <p className="text-lg font-bold text-foreground">{accounts.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Connected</p>
          <p className="text-lg font-bold text-primary">{connectedCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Total Balance</p>
          <p className="text-lg font-bold text-foreground">${totalBalance.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Issues</p>
          <p className="text-lg font-bold text-destructive">{issuesCount}</p>
        </div>
      </div>

      {accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 rounded-lg border border-dashed border-border bg-card/40">
          <Link2 className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-foreground font-medium">No accounts connected</p>
          <p className="text-xs text-muted-foreground mt-1">Connect your first source to see analytics</p>
          <button onClick={() => setIsAddModalOpen(true)} className="mt-4 text-xs font-semibold text-primary hover:underline underline-offset-4">Connect now</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc, i) => {
            const Icon = iconMap[acc.type] || Building;
            const status = statusConfig[acc.status];
            const StatusIcon = status.icon;
            const isSyncing = syncingId === acc.id;

            return (
              <div
                key={acc.id}
                className="rounded-lg border border-border bg-card p-4 card-hover shadow-sm"
                style={{ animation: `slide-up-fade 0.5s ease-out ${i * 0.06}s forwards`, opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.class}`}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-sm tracking-tight">{acc.name}</h3>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">{acc.institution} · {acc.type}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">Last sync: {acc.lastSync}</span>
                  <span className={`text-sm font-bold ${acc.balance >= 0 ? "text-foreground" : "text-destructive"}`}>
                    {acc.balance < 0 ? "-" : ""}${Math.abs(acc.balance).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => handleSync(acc.id)}
                    disabled={isSyncing}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-accent/50 py-2 text-xs font-semibold text-foreground hover:bg-accent transition-all active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3 w-3 ${isSyncing ? "animate-spin" : ""}`} /> 
                    {isSyncing ? "Syncing..." : "Sync Now"}
                  </button>
                  <button 
                    onClick={() => {
                      setAccountToDelete(acc.id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 hover:border-destructive/30 transition-all active:scale-95"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="bg-card border-border shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-foreground">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action will permanently disconnect this account. You will need to link it again to see your latest data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-accent/50 border-border text-foreground hover:bg-accent">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Disconnect Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConnectedAccounts;
