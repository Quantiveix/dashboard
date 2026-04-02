import { useState, useCallback } from "react";

export const useSidebarCollapse = () => {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("qix_sidebar") === "collapsed";
  });

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("qix_sidebar", next ? "collapsed" : "expanded");
      return next;
    });
  }, []);

  return { collapsed, toggle };
};
