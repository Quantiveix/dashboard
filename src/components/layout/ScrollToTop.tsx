import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the very top of the window
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // We use instant to avoid jarring visible scroll on navigation
    });
    
    // Also target potential scrollable containers if and only if they exist
    const scrollableElements = [
      document.body,
      document.documentElement,
      document.querySelector("main")
    ];
    
    scrollableElements.forEach(el => {
      if (el) el.scrollTop = 0;
    });
    
  }, [pathname]);

  return null;
};

export default ScrollToTop;
