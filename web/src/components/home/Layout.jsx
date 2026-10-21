import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GlobalNav from "./GlobalNav.jsx";
import SiteFooter from "./SiteFooter.jsx";

// Client-side navigation keeps the old scroll position by default; reset to
// the top on page change, or scroll to the #section a link points at.
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the new page's sections exist before looking one up.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
}

export default function Layout() {
  useScrollOnNavigate();
  return (
    <div className="min-h-screen bg-surface font-body">
      <GlobalNav />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
