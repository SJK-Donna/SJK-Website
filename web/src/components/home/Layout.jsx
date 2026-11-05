import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GlobalNav from "./GlobalNav.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { BrandDefs } from "../ui/Brand.jsx";
import { pageMeta } from "../../content/seo.js";

// Each page's HTML already carries its own title and tags (written at build
// time); keep them right when moving between pages inside the site, so the
// browser tab, history and any link copied from it match the page shown.
function usePageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = pageMeta(pathname.replace(/\/+$/, "") || "/");
    document.title = m.title;
    const set = (selector, attr, value) => document.head.querySelector(selector)?.setAttribute(attr, value);
    set('meta[name="description"]', "content", m.description);
    set('link[rel="canonical"]', "href", m.url);
    set('meta[property="og:title"]', "content", m.title);
    set('meta[property="og:description"]', "content", m.description);
    set('meta[property="og:url"]', "content", m.url);
  }, [pathname]);
}

// Client-side navigation keeps the old scroll position by default; reset to
// the top on page change, or scroll to the #section a link points at.
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the new page's sections exist before looking one up.
      window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
}

export default function Layout() {
  useScrollOnNavigate();
  usePageMeta();
  return (
    <div className="min-h-screen bg-surface font-body">
      <BrandDefs />
      <GlobalNav />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
