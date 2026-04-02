import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";

const DashboardLayout = () => {
  const { collapsed, toggle } = useSidebarCollapse();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header receives onMenuClick so the hamburger lives inside the header. */}
      {/* On desktop it is offset by the sidebar width so the sidebar logo stays visible. */}
      <Header onMenuClick={() => setDrawerOpen(true)} sidebarCollapsed={collapsed} />

      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main
        className={`pt-14 transition-all duration-300 ${
          collapsed ? "md:pl-16" : "md:pl-64"
        }`}
      >
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
