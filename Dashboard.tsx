import { useState } from "react";
import {
  TrendingUp, TrendingDown, ShoppingCart, Package, Users,
  AlertTriangle, DollarSign, ArrowRight, BarChart2, Briefcase,
  ArrowUpCircle
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import type { AppState } from "../App";
import {
  PRODUCTS, TRANSACTIONS, SALES_DATA_7D, MONTHLY_REVENUE,
  formatCurrency, WORKERS, BRANCHES, EXPENSES
} from "../data/mockData";

interface Props { ctx: AppState; }

function KpiCard({ label, value, change, changeDir, sub, icon, iconBg }: {
  label: string; value: string; change?: string; changeDir?: "up"|"down"|"neutral";
  sub?: string; icon: React.ReactNode; iconBg: string;
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon" style={{ background: iconBg }}>{icon}</div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {(change || sub) && (
        <div className={`kpi-change ${changeDir || "neutral"}`}>
          {changeDir === "up" && <TrendingUp size={12} />}
          {changeDir === "down" && <TrendingDown size={12} />}
          {change && <span>{change}</span>}
          {sub && <span style={{ color: "var(--text-subtle)", fontWeight: 400 }}>{sub}</span>}
        </div>
      )}
    </div>
  );
}

const CHART_FILTERS = ["Today", "7 Days", "30 Days", "Monthly"];

export default function Dashboard({ ctx }: Props) {
  const [chartFilter, setChartFilter] = useState("7 Days");
  const { user } = ctx;

  const lowStock   = PRODUCTS.filter(p => p.status === "low_stock");
  const outOfStock = PRODUCTS.filter(p => p.status === "out_of_stock");
  const alertItems = [...outOfStock, ...lowStock];
  const totalInvValue = PRODUCTS.reduce((s, p) => s + p.sellingPrice * p.stock, 0);

  /* ──────────────────────────────────────────── */
  /* BUSINESS OWNER / ADMIN / MANAGER DASHBOARD  */
  /* ──────────────────────────────────────────── */
  if (["owner","admin","manager"].includes(user.role)) {
    return (
      <div>
        {/* Header */}
        <div className="page-header">
          <div>
            <div className="page-title">Dashboard</div>
            <div className="page-subtitle">
              {new Date().toLocaleDateString("en-KE",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} — {user.branch}
            </div>
          </div>
          <div className="page-actions">
            {user.role === "owner" && (
              <select className="select" style={{ fontSize: 13, height: 33 }}>
                <option>All Branches</option>
                <option>Main Branch</option>
                <option>Westlands Branch</option>
                <option>Industrial Area Branch</option>
              </select>
            )}
            <button className="btn btn-accent btn-sm" onClick={() => ctx.setPage("pos")}>
              <ShoppingCart size={14} /> New Sale
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))", gap: 10, marginBottom: 18 }}>
          <KpiCard label="Today's Sales" value="KES 252,500"
            change="+8.4% vs yesterday" changeDir="up"
            icon={<ShoppingCart size={16} color="#2563eb" />} iconBg="var(--accent-50)" />
          <KpiCard label="Monthly Revenue" value="KES 3.92M"
            change="+12.1% vs last month" changeDir="up"
            icon={<TrendingUp size={16} color="#15803d" />} iconBg="var(--success-50)" />
          <KpiCard label="Total Expenses" value="KES 569,300"
            change="-3.2% vs last month" changeDir="down"
            icon={<ArrowUpCircle size={16} color="#b91c1c" />} iconBg="var(--danger-50)" />
          <KpiCard label="Estimated Profit" value="KES 1.68M"
            change="+18.7% vs last month" changeDir="up"
            icon={<DollarSign size={16} color="#15803d" />} iconBg="var(--success-50)" />
          {user.role === "owner" && (
            <>
              <KpiCard label="Business Balance" value="KES 2.48M"
                sub="current" icon={<BarChart2 size={16} color="#1a3557" />} iconBg="var(--navy-50)" />
              <KpiCard label="Inventory Value" value={`KES ${(totalInvValue/1000000).toFixed(2)}M`}
                sub={`${PRODUCTS.length} products`} icon={<Package size={16} color="#7c3aed" />} iconBg="var(--purple-100)" />
              <KpiCard label="Low / Out of Stock" value={String(alertItems.length)}
                change={`${outOfStock.length} out of stock`} changeDir={outOfStock.length > 0 ? "down" : "neutral"}
                icon={<AlertTriangle size={16} color="#b45309" />} iconBg="var(--warning-50)" />
              <KpiCard label="Total Workers" value={String(WORKERS.length)}
                sub={`${WORKERS.filter(w=>w.status==="active").length} active`}
                icon={<Briefcase size={16} color="#0369a1" />} iconBg="#e0f2fe" />
            </>
          )}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 14, marginBottom: 14 }}>
          {/* Sales trend */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Sales Performance</div>
                <div className="card-subtitle">Revenue trend</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {CHART_FILTERS.map(f => (
                  <button key={f} onClick={() => setChartFilter(f)}
                    className={`btn btn-xs ${chartFilter === f ? "btn-primary" : "btn-ghost"}`}
                    style={{ fontWeight: chartFilter === f ? 600 : 400 }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: "16px 20px 14px" }}>
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={SALES_DATA_7D} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 3" stroke="#edf0f3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11.5, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ borderRadius: 5, border: "1px solid var(--border)", fontSize: 12.5, boxShadow: "var(--shadow-md)" }}
                    formatter={(v) => [`KES ${Number(v).toLocaleString()}`, "Sales"]} />
                  <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2}
                    fill="url(#sg)" dot={{ r: 3, fill: "#2563eb", strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#2563eb" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Financial overview */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Financial Overview</div>
                <div className="card-subtitle">7-month comparison</div>
              </div>
            </div>
            <div style={{ padding: "16px 16px 14px" }}>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 0, bottom: 0, left: -14 }}
                  barSize={10} barGap={2} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="2 3" stroke="#edf0f3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10.5, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
                  <Tooltip contentStyle={{ borderRadius: 5, border: "1px solid var(--border)", fontSize: 12.5, boxShadow: "var(--shadow-md)" }}
                    formatter={(v) => `KES ${(Number(v)/1000).toFixed(0)}K`} />
                  <Legend iconSize={9} wrapperStyle={{ fontSize: 11.5, paddingTop: 8 }} />
                  <Bar dataKey="revenue" name="Revenue" fill="#1a3557" radius={[2,2,0,0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#e2e6eb" radius={[2,2,0,0]} />
                  <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
          {/* Transactions */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div className="card-header">
              <div className="card-title">Recent Transactions</div>
              <button className="btn btn-ghost btn-xs" style={{ color: "var(--accent-600)", fontWeight: 500 }}>
                View all <ArrowRight size={11} />
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th><th>Customer</th><th>Payment</th>
                    <th>Amount</th><th>Status</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.slice(0,7).map(tx => (
                    <tr key={tx.id}>
                      <td><span className="mono text-xs" style={{ color: "var(--accent-600)", fontWeight: 500 }}>{tx.id}</span></td>
                      <td className="text-sm truncate" style={{ maxWidth: 140 }}>{tx.customer}</td>
                      <td style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{tx.paymentMethod}</td>
                      <td><span className="mono text-sm" style={{ fontWeight: 600 }}>{formatCurrency(tx.amount)}</span></td>
                      <td>
                        <span className={`badge ${tx.status==="completed"?"badge-success":tx.status==="pending"?"badge-warning":"badge-danger"}`}>
                          {tx.status.charAt(0).toUpperCase()+tx.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{tx.date.split(" ")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Low stock */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div className="card-header">
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertTriangle size={14} color="var(--warning-700)" />
                  <span className="card-title">Stock Alerts</span>
                </div>
                <span className="badge badge-warning">{alertItems.length}</span>
              </div>
              {alertItems.slice(0,5).map(p => (
                <div key={p.id} style={{
                  padding: "9px 16px", borderBottom: "1px solid var(--border-light)",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="text-sm truncate" style={{ fontWeight: 500 }}>{p.name}</div>
                    <div className="mono text-2xs" style={{ color: "var(--text-subtle)", marginTop: 1 }}>{p.sku}</div>
                  </div>
                  <span className={`badge ${p.status==="out_of_stock"?"badge-danger":"badge-warning"}`} style={{ fontSize: 11, flexShrink: 0, marginLeft: 8 }}>
                    {p.status==="out_of_stock" ? "Out" : `${p.stock} left`}
                  </span>
                </div>
              ))}
            </div>

            {/* Branch performance – owner only */}
            {user.role === "owner" && (
              <div className="card" style={{ overflow: "hidden" }}>
                <div className="card-header">
                  <span className="card-title">Branch Performance</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Today</span>
                </div>
                {BRANCHES.map(b => (
                  <div key={b.id} style={{ padding: "9px 16px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div className="text-sm" style={{ fontWeight: 500 }}>{b.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{b.workers} workers</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="mono text-sm" style={{ fontWeight: 700, color: "var(--navy-800)" }}>{formatCurrency(b.todaySales)}</div>
                      <div style={{ fontSize: 11, color: "var(--text-subtle)" }}>today</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────── CASHIER ──────────────────── */
  if (user.role === "cashier") {
    const myTxns = TRANSACTIONS.filter(t => t.cashier === user.name);
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="page-title">Good morning, {user.name.split(" ")[0]}</div>
            <div className="page-subtitle">{user.branch} — {new Date().toLocaleDateString("en-KE",{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
          <button className="btn btn-accent" onClick={() => ctx.setPage("pos")}>
            <ShoppingCart size={15} /> Open POS
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
          <KpiCard label="My Sales Today" value="KES 48,200" change="+5.2% vs yesterday" changeDir="up"
            icon={<ShoppingCart size={16} color="#2563eb" />} iconBg="var(--accent-50)" />
          <KpiCard label="Transactions Today" value="6" sub="completed"
            icon={<BarChart2 size={16} color="#15803d" />} iconBg="var(--success-50)" />
          <KpiCard label="Branch Total" value="KES 252,500" sub="all cashiers"
            icon={<DollarSign size={16} color="#7c3aed" />} iconBg="var(--purple-100)" />
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="card-header"><div className="card-title">My Recent Sales</div></div>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Customer</th><th>Payment</th><th>Amount</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {(myTxns.length > 0 ? myTxns : TRANSACTIONS.slice(0,4)).map(tx => (
                <tr key={tx.id}>
                  <td><span className="mono text-xs" style={{ color: "var(--accent-600)" }}>{tx.id}</span></td>
                  <td className="text-sm">{tx.customer}</td>
                  <td style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{tx.paymentMethod}</td>
                  <td><span className="mono text-sm" style={{ fontWeight: 600 }}>{formatCurrency(tx.amount)}</span></td>
                  <td><span className={`badge ${tx.status==="completed"?"badge-success":"badge-warning"}`}>{tx.status}</span></td>
                  <td className="text-xs" style={{ color: "var(--text-muted)" }}>{tx.date.split(" ")[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* ─────────────────── STOCK MANAGER ─────────────── */
  if (user.role === "stock_manager") {
    const inStock = PRODUCTS.filter(p => p.status === "in_stock").length;
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="page-title">Inventory Dashboard</div>
            <div className="page-subtitle">{user.branch} — Stock management overview</div>
          </div>
          <button className="btn btn-accent btn-sm" onClick={() => ctx.setPage("inventory")}>
            <Package size={14} /> Manage Stock
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 18 }}>
          <KpiCard label="Total Products" value={String(PRODUCTS.length)} icon={<Package size={16} color="#1a3557" />} iconBg="var(--navy-50)" />
          <KpiCard label="In Stock" value={String(inStock)} change="products" changeDir="up" icon={<Package size={16} color="#15803d" />} iconBg="var(--success-50)" />
          <KpiCard label="Low Stock" value={String(lowStock.length)} icon={<AlertTriangle size={16} color="#b45309" />} iconBg="var(--warning-50)" />
          <KpiCard label="Out of Stock" value={String(outOfStock.length)} icon={<AlertTriangle size={16} color="#b91c1c" />} iconBg="var(--danger-50)" />
          <KpiCard label="Inventory Value" value={`KES ${(totalInvValue/1000000).toFixed(2)}M`} icon={<DollarSign size={16} color="#7c3aed" />} iconBg="var(--purple-100)" />
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={14} color="var(--warning-700)" />
              <span className="card-title">Stock Requiring Attention</span>
            </div>
          </div>
          <table className="data-table">
            <thead><tr><th>Product</th><th>SKU</th><th>Current</th><th>Min. Stock</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {alertItems.map(p => (
                <tr key={p.id}>
                  <td className="text-sm" style={{ fontWeight: 500 }}>{p.name}</td>
                  <td><span className="mono text-xs">{p.sku}</span></td>
                  <td><span className="mono text-sm" style={{ fontWeight: 700, color: p.stock===0?"var(--danger-700)":"var(--warning-700)" }}>{p.stock}</span></td>
                  <td><span className="mono text-xs" style={{ color: "var(--text-muted)" }}>{p.minStock}</span></td>
                  <td><span className={`badge ${p.status==="out_of_stock"?"badge-danger":"badge-warning"}`}>{p.status==="out_of_stock"?"Out of Stock":"Low Stock"}</span></td>
                  <td><button className="btn btn-secondary btn-xs" onClick={() => ctx.setPage("inventory")}>Restock</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* ─────────────────── WORKER ─────────────────────── */
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Workspace</div>
          <div className="page-subtitle">{user.branch} — {user.position}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
        <KpiCard label="Assigned Branch" value={user.branch.replace(" Branch","")} icon={<BarChart2 size={16} color="#1a3557" />} iconBg="var(--navy-50)" />
        <KpiCard label="Position" value={user.position} icon={<Briefcase size={16} color="#7c3aed" />} iconBg="var(--purple-100)" />
        <KpiCard label="Account Status" value="Active" icon={<Users size={16} color="#15803d" />} iconBg="var(--success-50)" />
      </div>
      <div className="card" style={{ padding: 22 }}>
        <div className="card-title" style={{ marginBottom: 14 }}>Quick Actions</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-primary" onClick={() => ctx.setPage("pos")}><ShoppingCart size={14} /> New Sale</button>
          <button className="btn btn-secondary" onClick={() => ctx.setPage("barcode")}><Package size={14} /> Scan Product</button>
        </div>
      </div>
    </div>
  );
}
