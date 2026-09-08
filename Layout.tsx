import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Scan, Users, Truck,
  Briefcase, Shield, DollarSign, TrendingUp, BookOpen, BarChart2,
  GitBranch, Settings, Bell, Search, LogOut, Menu,
  ArrowDownCircle, ArrowUpCircle, Scale, User, Building2,
  ChevronRight, X, CreditCard
} from "lucide-react";
import type { AppState, Page } from "../App";
import { NOTIFICATIONS } from "../data/mockData";

interface NavItem { id: Page; label: string; icon: React.ReactNode; perm?: string; }
interface NavSection { title: string; items: NavItem[]; }

const ALL_NAV: NavSection[] = [
  { title: "Overview", items: [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={15} /> },
  ]},
  { title: "Sales", items: [
    { id: "pos",     label: "Point of Sale",    icon: <ShoppingCart size={15} />, perm: "create_sale" },
    { id: "barcode", label: "Barcode Scanner",  icon: <Scan size={15} />,         perm: "view_inventory" },
  ]},
  { title: "Inventory", items: [
    { id: "inventory", label: "Inventory",   icon: <Package size={15} />,  perm: "view_inventory" },
  ]},
  { title: "Finance", items: [
    { id: "finance",       label: "Finance Overview", icon: <DollarSign size={15} />,    perm: "view_income" },
    { id: "income",        label: "Income",           icon: <ArrowDownCircle size={15} />,perm: "view_income" },
    { id: "expenses",      label: "Expenses",         icon: <ArrowUpCircle size={15} />, perm: "view_expenses" },
    { id: "ledger",        label: "Business Ledger",  icon: <BookOpen size={15} />,      perm: "view_ledger" },
    { id: "profit_loss",   label: "Profit & Loss",    icon: <TrendingUp size={15} />,    perm: "view_profit_loss" },
    { id: "balance_sheet", label: "Balance Sheet",    icon: <Scale size={15} />,         perm: "view_balance_sheet" },
  ]},
  { title: "Contacts", items: [
    { id: "customers", label: "Customers", icon: <Users size={15} />,  perm: "view_customers" },
    { id: "suppliers", label: "Suppliers", icon: <Truck size={15} />,  perm: "view_suppliers" },
  ]},
  { title: "Team", items: [
    { id: "workers", label: "Workers",           icon: <Briefcase size={15} />, perm: "view_workers" },
    { id: "roles",   label: "Roles & Permissions", icon: <Shield size={15} />,  perm: "manage_roles"  },
  ]},
  { title: "Business", items: [
    { id: "branches",         label: "Branches",         icon: <GitBranch size={15} />, perm: "view_branches" },
    { id: "business_profile", label: "Business Profile", icon: <Building2 size={15} />, perm: "manage_settings" },
    { id: "billing",          label: "Billing & Subscription", icon: <CreditCard size={15} />, perm: "manage_settings" },
    { id: "reports",          label: "Reports",          icon: <BarChart2 size={15} />, perm: "view_reports" },
  ]},
  { title: "System", items: [
    { id: "settings", label: "Settings", icon: <Settings size={15} />, perm: "view_settings" },
  ]},
];

const CASHIER_NAV: NavSection[] = [
  { title: "Work", items: [
    { id: "dashboard", label: "Dashboard",      icon: <LayoutDashboard size={15} /> },
    { id: "pos",       label: "Point of Sale",  icon: <ShoppingCart size={15} />    },
    { id: "barcode",   label: "Barcode Scanner", icon: <Scan size={15} />           },
  ]},
  { title: "Data", items: [
    { id: "inventory", label: "Products",   icon: <Package size={15} /> },
    { id: "customers", label: "Customers",  icon: <Users size={15} />   },
  ]},
];

const STOCK_NAV: NavSection[] = [
  { title: "Work", items: [
    { id: "dashboard", label: "Dashboard",      icon: <LayoutDashboard size={15} /> },
    { id: "inventory", label: "Inventory",      icon: <Package size={15} />         },
    { id: "barcode",   label: "Barcode Scanner", icon: <Scan size={15} />           },
    { id: "suppliers", label: "Suppliers",      icon: <Truck size={15} />           },
  ]},
];

const WORKER_NAV: NavSection[] = [
  { title: "Work", items: [
    { id: "dashboard", label: "Dashboard",     icon: <LayoutDashboard size={15} /> },
    { id: "pos",       label: "Point of Sale", icon: <ShoppingCart size={15} />    },
  ]},
];

function getNav(role: string): NavSection[] {
  if (role === "cashier") return CASHIER_NAV;
  if (role === "stock_manager") return STOCK_NAV;
  if (role === "worker") return WORKER_NAV;
  return ALL_NAV;
}

const AVATAR_COLORS = [
  "#1a3557","#1d4ed8","#15803d","#7c3aed","#b45309","#0369a1","#065f46","#7f1d1d"
];

function getAvatarColor(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

interface Props { ctx: AppState; children: React.ReactNode; }

export default function Layout({ ctx, children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, permissions, currentPage, setPage, logout } = ctx;

  const nav = getNav(user.role);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const avatarColor = getAvatarColor(user.name);

  const canSee = (item: NavItem) => !item.perm || permissions.includes(item.perm);

  const closeAll = () => { setShowNotifs(false); setShowUserMenu(false); };

  return (
    <div className="app-shell" onClick={closeAll}>
      {/* ── SIDEBAR ── */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div style={{
            width: 28, height: 28, borderRadius: 6, background: "var(--accent-600)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <LayoutDashboard size={15} color="white" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontFamily: "Outfit", fontSize: 16, fontWeight: 800, color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>
                BizLedger
              </div>
              <div style={{ fontSize: 9.5, color: "rgba(160,185,212,0.55)", letterSpacing: "0.08em", marginTop: 1.5 }}>
                BUSINESS PLATFORM
              </div>
            </div>
          )}
        </div>

        {/* Nav body */}
        <div className="sidebar-body">
          {nav.map(section => {
            const visible = section.items.filter(canSee);
            if (!visible.length) return null;
            return (
              <div key={section.title}>
                {!collapsed && <div className="nav-group-label">{section.title}</div>}
                {collapsed && <div style={{ height: 10 }} />}
                {visible.map(item => (
                  <div
                    key={item.id}
                    className={`nav-item ${currentPage === item.id ? "active" : ""}`}
                    onClick={e => { e.stopPropagation(); setPage(item.id); }}
                    data-tooltip={collapsed ? item.label : undefined}
                    style={{ justifyContent: collapsed ? "center" : "flex-start", paddingLeft: collapsed ? 9 : 9 }}
                  >
                    <span className="nav-item-icon">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="nav-item-label">{item.label}</span>
                        {currentPage === item.id && <ChevronRight size={11} style={{ opacity: 0.5, flexShrink: 0 }} />}
                      </>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* User footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={e => { e.stopPropagation(); setPage("profile"); }}>
            <div className="avatar avatar-sm" style={{ background: avatarColor }}>{initials}</div>
            {!collapsed && (
              <div style={{ overflow: "hidden", flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(230,238,248,0.9)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: 11, color: "rgba(160,185,212,0.5)", whiteSpace: "nowrap" }}>{user.position}</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="main-area">
        {/* Topbar */}
        <header className="topbar" onClick={e => e.stopPropagation()}>
          <button className="btn btn-ghost btn-icon" onClick={() => setCollapsed(c => !c)}>
            <Menu size={17} />
          </button>

          {/* Search */}
          <div className="search-input-wrap" style={{ flex: 1, maxWidth: 380 }}>
            <Search size={14} className="search-icon-abs" />
            <input
              className="input"
              placeholder="Search products, orders, customers..."
              style={{ height: 33, fontSize: 13, background: "var(--gray-50)" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
            {/* Branch chip */}
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "var(--navy-50)", border: "1px solid var(--navy-200)",
              borderRadius: "var(--radius)", padding: "4px 10px",
              fontSize: 12, color: "var(--navy-700)", fontWeight: 500
            }}>
              <GitBranch size={12} />
              {user.branch}
            </div>

            {/* Subscription status (owner only) */}
            {user.role === "owner" && ctx.subscription.status !== "lifetime" && (
              <button
                onClick={e => { e.stopPropagation(); setPage("billing"); }}
                className={`badge ${ctx.subscription.status === "trial" ? "badge-warning" : "badge-success"}`}
                style={{ cursor: "pointer", border: "none" }}
              >
                {ctx.subscription.status === "trial" ? "Trial" : "Monthly Plan"}
              </button>
            )}

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                className="btn btn-ghost btn-icon"
                style={{ position: "relative", width: 33, height: 33 }}
                onClick={e => { e.stopPropagation(); setShowNotifs(v => !v); setShowUserMenu(false); }}
              >
                <Bell size={17} />
                {unread > 0 && <span className="notif-badge" />}
              </button>
              {showNotifs && (
                <div className="popover" style={{ top: "calc(100% + 8px)", right: 0, width: 360 }} onClick={e => e.stopPropagation()}>
                  <div style={{ padding: "11px 16px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 14 }}>Notifications</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {unread > 0 && <span className="badge badge-danger">{unread} new</span>}
                      <button className="btn btn-ghost btn-xs" style={{ color: "var(--accent-600)", fontWeight: 500 }}>Mark all read</button>
                    </div>
                  </div>
                  <div style={{ maxHeight: 340, overflowY: "auto" }}>
                    {NOTIFICATIONS.map(n => (
                      <div key={n.id} style={{
                        padding: "10px 16px", borderBottom: "1px solid var(--border-light)",
                        background: n.read ? "white" : "var(--accent-50)",
                        cursor: "pointer", display: "flex", gap: 11
                      }}>
                        <div style={{
                          width: 7, height: 7, borderRadius: "50%", flexShrink: 0, marginTop: 5,
                          background: n.type === "danger" ? "var(--danger-600)" : n.type === "warning" ? "var(--warning-600)" : n.type === "success" ? "var(--success-600)" : "var(--accent-500)"
                        }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{n.title}</div>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1, lineHeight: 1.4 }}>{n.message}</div>
                          <div style={{ fontSize: 11, color: "var(--text-subtle)", marginTop: 4 }}>{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div style={{ position: "relative" }}>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "white", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", padding: "4px 10px 4px 6px",
                  cursor: "pointer", transition: "all 0.12s"
                }}
                onClick={e => { e.stopPropagation(); setShowUserMenu(v => !v); setShowNotifs(false); }}
              >
                <div className="avatar avatar-sm" style={{ background: avatarColor }}>{initials}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}>{user.name.split(" ")[0]}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.2 }}>{user.position}</div>
                </div>
              </button>
              {showUserMenu && (
                <div className="popover" style={{ top: "calc(100% + 8px)", right: 0, width: 200, overflow: "hidden" }} onClick={e => e.stopPropagation()}>
                  <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid var(--border-light)" }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{user.email}</div>
                  </div>
                  {[
                    { label: "My Profile",  icon: <User size={13} />,     page: "profile"   as Page },
                    { label: "Settings",    icon: <Settings size={13} />, page: "settings"  as Page },
                  ].map(item => (
                    <button key={item.label} onClick={() => { setPage(item.page); closeAll(); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 9, width: "100%",
                        padding: "8px 14px", background: "none", border: "none",
                        cursor: "pointer", fontSize: 13.5, color: "var(--text-secondary)"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--gray-50)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "none")}
                    >
                      {item.icon}{item.label}
                    </button>
                  ))}
                  <div style={{ borderTop: "1px solid var(--border-light)" }}>
                    <button onClick={logout}
                      style={{
                        display: "flex", alignItems: "center", gap: 9, width: "100%",
                        padding: "8px 14px", background: "none", border: "none",
                        cursor: "pointer", fontSize: 13.5, color: "var(--danger-700)"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--danger-50)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "none")}
                    >
                      <LogOut size={13} />Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content" onClick={closeAll}>
          {children}
        </main>
      </div>
    </div>
  );
}
