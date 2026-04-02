import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Brain, ArrowRightLeft, Plus,
  PieChart, TrendingUp, Link2, Activity, Settings, ChevronLeft, ChevronRight
} from "lucide-react";

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

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  const isActive = (to: string, end?: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 border-r border-border bg-sidebar hidden md:flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div
        className={`h-14 flex items-center border-b border-border shrink-0 ${
          collapsed ? "justify-center px-2" : "px-5"
        }`}
      >
        {collapsed ? (
          <img src="/Favicon.svg" alt="QuantiveIx Favicon" className="w-10 h-10" />
        ) : (
          <img src="/Logo.svg" alt="QuantiveIx Logo" className="h-16 w-auto" />
        )}
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5 sidebar-scroll">
        {navSections.map((section) => (
          <div key={section.label}>
            {/* Section label — hidden when collapsed */}
            {!collapsed && (
              <p className="px-4 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">
                {section.label}
              </p>
            )}
            {collapsed && (
              /* Thin divider between sections in collapsed mode */
              <div className="mx-3 mb-2 border-t border-border/50" />
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.to, item.end);
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      title={collapsed ? item.label : undefined}
                      className={`
                        group relative flex items-center gap-3 mx-2 px-3 py-2 rounded-md text-sm font-medium
                        transition-all duration-200 ease-in-out
                        ${active
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-foreground hover:bg-accent/60 hover:text-foreground"
                        }
                      `}
                    >
                      {/* Active indicator bar */}
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary" />
                      )}
                      <item.icon
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          active ? "text-primary" : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
                        }`}
                      />
                      {!collapsed && (
                        <span className="leading-tight break-words">{item.label}</span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom: Profile & Settings + collapse toggle */}
      <div className="border-t border-border">
        {/* Profile & Settings */}
        <div className="px-2 py-2">
          <NavLink
            to={bottomItem.to}
            title={collapsed ? bottomItem.label : undefined}
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
            {!collapsed && (
              <span className="leading-tight break-words">{bottomItem.label}</span>
            )}
          </NavLink>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center h-9 border-t border-border text-muted-foreground hover:text-foreground hover:bg-accent/40 transition-all duration-200"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed
            ? <ChevronRight className="h-4 w-4" />
            : <ChevronLeft className="h-4 w-4" />
          }
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
