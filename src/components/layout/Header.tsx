import React, { useState, useRef, useMemo } from "react";
import { Bell, Search as SearchIcon, ChevronDown, LogOut, User, X, Menu, LayoutDashboard, BarChart3, Brain, ArrowDownUp, PlusCircle, PieChart, TrendingUp, Link2, Settings, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { notificationItems } from "@/utils/mockData";
import { useNavigate } from "react-router-dom";

const searchPages = [
  { name: "Dashboard Overview", path: "/dashboard", icon: LayoutDashboard, keywords: ["home", "stats", "kpi", "summary"] },
  { name: "Financial Analytics", path: "/dashboard/analytics", icon: BarChart3, keywords: ["charts", "reports", "data", "spending"] },
  { name: "AI Insights", path: "/dashboard/ai-insights", icon: Brain, keywords: ["ai", "recommendations", "tips", "advisor"] },
  { name: "Transactions History", path: "/dashboard/transactions", icon: ArrowDownUp, keywords: ["list", "history", "payments", "log"] },
  { name: "Add New Transaction", path: "/dashboard/add-transaction", icon: PlusCircle, keywords: ["new", "create", "entry", "upload"] },
  { name: "Spending Categories", path: "/dashboard/categories", icon: PieChart, keywords: ["breakdown", "types", "pie"] },
  { name: "Predictive Forecasts", path: "/dashboard/forecasts", icon: TrendingUp, keywords: ["future", "planning", "projections"] },
  { name: "Connected Accounts", path: "/dashboard/accounts", icon: Link2, keywords: ["banks", "linking", "sources", "connections"] },
  { name: "System Monitor", path: "/dashboard/system", icon: ShieldCheck, keywords: ["health", "status", "realtime"] },
  { name: "Profile & Settings", path: "/dashboard/profile", icon: Settings, keywords: ["account", "password", "security", "notifications"] },
];

interface HeaderProps {
  onMenuClick?: () => void;
  sidebarCollapsed?: boolean;
}

const Header = ({ onMenuClick, sidebarCollapsed }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState(notificationItems);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useOutsideClick(notifRef, () => setShowNotif(false));
  useOutsideClick(profileRef, () => setShowProfile(false));
  useOutsideClick(searchRef, () => setSearchQuery(""));

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchPages.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.keywords.some(k => k.includes(q))
    ).slice(0, 5);
  }, [searchQuery]);

  const unread = notifications.filter((n) => !n.read).length;

  const SearchResult = ({ page }: { page: typeof searchPages[0] }) => (
    <button
      onClick={() => { navigate(page.path); setSearchQuery(""); setShowMobileSearch(false); }}
      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent transition-colors text-left group"
    >
      <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <page.icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">{page.name}</p>
        <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">{page.path}</p>
      </div>
    </button>
  );

  return (
    <header
      className={`fixed top-0 right-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur flex items-center px-3 sm:px-4 gap-2 sm:gap-3 transition-all duration-300
        left-0 ${
          sidebarCollapsed ? "md:left-16" : "md:left-64"
        }`}
    >

      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="p-1.5 rounded-md hover:bg-accent transition-colors md:hidden shrink-0"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Desktop Search */}
      <div className="hidden sm:flex flex-1 items-center relative" ref={searchRef}>
        <div className="relative flex items-center rounded-md border border-border w-full max-w-sm transition-all duration-300 focus-within:border-primary/60 focus-within:max-w-md focus-within:ring-1 focus-within:ring-primary/20">
          <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            className="w-full bg-transparent py-1.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Search pages, settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Results Dropdown */}
        {filteredPages.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-full max-w-md bg-card border border-border rounded-lg shadow-2xl animate-fade-scale overflow-hidden z-50 py-1">
            <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground border-b border-border/50 mb-1">
              Top Result
            </div>
            {filteredPages.map(p => <SearchResult key={p.path} page={p} />)}
          </div>
        )}
      </div>

      <div className="flex-1 sm:hidden" />

      {/* Notifications */}
      <div className="relative shrink-0" ref={notifRef}>
        <button
          onClick={() => setShowNotif(!showNotif)}
          className="relative p-2 rounded-md hover:bg-accent transition-colors"
        >
          <Bell className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-muted-foreground" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground animate-pulse-dot">
              {unread}
            </span>
          )}
        </button>

        {showNotif && (
          <div 
            className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-16 sm:top-full mt-0 sm:mt-2 rounded-lg border border-border bg-card shadow-2xl animate-fade-scale overflow-hidden z-50 flex flex-col sm:w-[320px]"
            style={{ maxHeight: "calc(100vh - 5rem)" }}
          >
            <div className="p-3.5 border-b border-border text-sm font-bold bg-card/80 backdrop-blur sticky top-0 flex items-center justify-between">
              <span>Notifications ({unread})</span>
              <button onClick={() => setShowNotif(false)} className="sm:hidden text-muted-foreground p-1 hover:bg-accent rounded-md">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto divide-y divide-border/50 custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className={`px-4 py-3.5 text-sm transition-colors hover:bg-accent/10 ${!n.read ? "bg-primary/[0.03]" : ""}`}>
                    <div className="flex justify-between gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${!n.read ? "text-primary" : "text-muted-foreground"}`}>
                        {!n.read ? "New Update" : "Earlier"}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium">{n.time}</span>
                    </div>
                    <p className="text-foreground leading-snug font-medium line-clamp-2">{n.text}</p>
                  </div>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                  <Bell className="h-10 w-10 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-foreground font-medium">No notifications yet</p>
                  <p className="text-xs text-muted-foreground">We'll alert you here when something happens.</p>
                </div>
              )}
            </div>
            <button 
              onClick={markAllRead}
              className="p-3 text-[11px] font-bold text-center text-primary hover:bg-accent/30 border-t border-border transition-all uppercase tracking-widest disabled:opacity-50 disabled:pointer-events-none"
              disabled={unread === 0}
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative shrink-0" ref={profileRef}>
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-md hover:bg-accent transition-colors"
        >
          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold ring-1 ring-primary/10 shadow-sm transition-transform active:scale-95 leading-none">
            {user?.name?.charAt(0) || "U"}
          </div>
          <span className="text-sm font-medium text-foreground hidden lg:block max-w-[100px] truncate leading-none">
            {user?.name || "User"}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden lg:block" />
        </button>

        {showProfile && (
          <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-2xl animate-fade-scale overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-accent/20">
              <p className="text-sm font-bold text-foreground truncate leading-tight">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">{user?.email}</p>
            </div>
            <div className="py-1">
              <button 
                onClick={() => { setShowProfile(false); navigate("/dashboard/profile"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <User className="h-4 w-4 text-primary" /> Profile &amp; Settings
              </button>
              <button 
                onClick={() => { logout(); navigate("/login"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-accent text-destructive transition-colors border-t border-border mt-1"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
