import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  X, LayoutDashboard, BarChart3, Brain, ArrowRightLeft, Plus,
  PieChart, TrendingUp, Link2, Activity, Settings
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const navSections = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Overview", end: true },
    ],
  },
  {
    label: "Analytics",
    items: [
      { to: "/dashboard/analytics", icon: BarChart3, label: "Financial Analytics" },
      { to: "/dashboard/ai-insights", icon: Brain, label: "AI Insights" },
    ],
  },
  {
    label: "Transactions",
    items: [
      { to: "/dashboard/transactions", icon: ArrowRightLeft, label: "Transactions" },
      { to: "/dashboard/add-transaction", icon: Plus, label: "Add Transaction" },
    ],
  },
  {
    label: "Management",
    items: [
      { to: "/dashboard/categories", icon: PieChart, label: "Spending Categories" },
      { to: "/dashboard/forecasts", icon: TrendingUp, label: "Predictive Forecasts" },
      { to: "/dashboard/accounts", icon: Link2, label: "Connected Accounts" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/dashboard/system", icon: Activity, label: "System Monitor" },
    ],
  },
];

const bottomItem = { to: "/dashboard/profile", icon: Settings, label: "Profile & Settings" };

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  const { user } = useAuth();
  const drawerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useOutsideClick(drawerRef, onClose);

  if (!open) return null;

  const isActive = (to: string, end?: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-scale" />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-border flex flex-col animate-slide-in-left"
      >
        {/* Logo header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-border shrink-0">
          <img src="/Logo.svg" alt="QuantiveIx Logo" className="h-10 w-auto" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4.5 w-4.5 text-muted-foreground" />
          </button>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-5 sidebar-scroll">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="px-4 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.to, item.end);
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={onClose}
                        className={`
                          group relative flex items-center gap-3 mx-2 px-3 py-2 rounded-md text-sm font-medium
                          transition-all duration-200 ease-in-out
                          ${active
                            ? "bg-primary/10 text-primary"
                            : "text-sidebar-foreground hover:bg-accent/60 hover:text-foreground"
                          }
                        `}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary" />
                        )}
                        <item.icon
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                            active
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
                          }`}
                        />
                        <span className="truncate leading-none">{item.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom: Profile & Settings */}
        <div className="border-t border-border px-2 py-2">
          {user && (
            <div className="px-4 py-3 mb-2 rounded-md bg-accent/20">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          <NavLink
            to={bottomItem.to}
            onClick={onClose}
            className={`
              group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
              transition-all duration-200 ease-in-out
              ${isActive(bottomItem.to)
                ? "bg-primary/10 text-primary"
                : "text-sidebar-foreground hover:bg-accent/60 hover:text-foreground"
              }
            `}
          >
            {isActive(bottomItem.to) && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary" />
            )}
            <bottomItem.icon
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                isActive(bottomItem.to)
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
              }`}
            />
            <span className="truncate leading-none">{bottomItem.label}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
