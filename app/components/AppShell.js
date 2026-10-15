"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isProducts = pathname === "/products" || pathname.startsWith("/products/");
  const isSettings = pathname === "/settings";

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <Link className="brand" href="/products">
          <span className="brand-mark" aria-hidden="true">s</span>
          <span><span className="brand-name">stockroom</span><span className="brand-caption">product workspace</span></span>
        </Link>
        <nav aria-label="Workspace">
          <p className="nav-caption">Workspace</p>
          <Link className={`side-link ${isProducts ? "active" : ""}`} href="/products" aria-label="Products" aria-current={isProducts ? "page" : undefined}>
            <span className="side-link-icon" aria-hidden="true">▦</span><span>Products</span>
          </Link>
          <Link className={`side-link ${isSettings ? "active" : ""}`} href="/settings" aria-label="Settings" aria-current={isSettings ? "page" : undefined}>
            <span className="side-link-icon" aria-hidden="true">⚙</span><span>Settings</span>
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="user-chip">
            <span className="avatar" aria-hidden="true">JD</span>
            <span><span className="user-name">Jordan Davis</span><span className="user-role">Workspace admin</span></span>
          </div>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="crumb">Workspace&nbsp; / &nbsp;<strong>{isSettings ? "Settings" : "Products"}</strong></div>
          <div className="topbar-right">
            <span className="user-role">Local workspace</span>
            <span className="avatar" aria-hidden="true">JD</span>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}