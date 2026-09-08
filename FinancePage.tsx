import { useState } from "react";
import {
  DollarSign, ArrowDownCircle, ArrowUpCircle, TrendingUp, Scale,
  Search, Download, Plus
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { EXPENSES, LEDGER_ENTRIES, MONTHLY_REVENUE, formatCurrency } from "../data/mockData";
import type { AppState, Page } from "../App";

interface Props { ctx: AppState; tab: Page; }

const INCOME_RECORDS = [
  { id: "INC-2024-001", source: "Sales Revenue", amount: 252500, date: "2024-01-15", method: "Various", category: "Sales", description: "Daily sales — all branches" },
  { id: "INC-2024-002", source: "Nairobi Tech Hub Settlement", amount: 115000, date: "2024-01-15", method: "Bank Transfer", category: "Receivables", description: "Invoice INV-2024-0089 settled" },
  { id: "INC-2024-003", source: "Sales Revenue", amount: 489000, date: "2024-01-14", method: "Various", category: "Sales", description: "Daily sales — Main Branch" },
  { id: "INC-2024-004", source: "Equipment Sale", amount: 28000, date: "2024-01-12", method: "Cash", category: "Asset Sale", description: "Old display unit disposal" },
  { id: "INC-2024-005", source: "Sales Revenue", amount: 312000, date: "2024-01-11", method: "Various", category: "Sales", description: "Daily sales — all branches" },
];

const tabs = [
  { id: "finance" as Page,       label: "Overview",        icon: <DollarSign size={13} />    },
  { id: "income" as Page,        label: "Income",          icon: <ArrowDownCircle size={13} />},
  { id: "expenses" as Page,      label: "Expenses",        icon: <ArrowUpCircle size={13} />  },
  { id: "ledger" as Page,        label: "Ledger",          icon: <DollarSign size={13} />     },
  { id: "profit_loss" as Page,   label: "Profit & Loss",   icon: <TrendingUp size={13} />     },
  { id: "balance_sheet" as Page, label: "Balance Sheet",   icon: <Scale size={13} />          },
];

export default function FinancePage({ ctx, tab }: Props) {
  const [active, setActive] = useState(tab);
  const totalIncome = INCOME_RECORDS.reduce((s,r) => s+r.amount, 0);
  const totalExpenses = EXPENSES.reduce((s,e) => s+e.amount, 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Finance</div>
          <div className="page-subtitle">Financial records, statements, and reporting</div>
        </div>
        <div className="page-actions">
          <select className="select" style={{ height: 33, fontSize: 13, width: 160 }}>
            <option>January 2024</option><option>December 2023</option><option>Q4 2023</option>
          </select>
          <button className="btn btn-secondary btn-sm"><Download size={13} /> Export</button>
        </div>
      </div>

      <div className="tab-nav">
        {tabs.map(t => (
          <div key={t.id} className={`tab-item ${active===t.id?"active":""}`}
            onClick={() => { setActive(t.id); ctx.setPage(t.id); }}>
            {t.icon}{t.label}
          </div>
        ))}
      </div>

      {/* ── Overview ── */}
      {active === "finance" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
            {[
              { label:"Total Revenue (Jan)", value:"KES 3,920,000", change:"+12.1% vs Dec", dir:"up" as const, color:"var(--navy-800)" },
              { label:"Total Expenses (Jan)", value:"KES 2,240,000", change:"-3.2% vs Dec", dir:"down" as const, color:"var(--danger-700)" },
              { label:"Net Profit (Jan)",    value:"KES 1,680,000", change:"+18.7% vs Dec", dir:"up" as const, color:"var(--success-700)" },
            ].map(s => (
              <div key={s.label} className="kpi-card">
                <div className="kpi-label">{s.label}</div>
                <div className="kpi-value" style={{ color: s.color }}>{s.value}</div>
                <div className={`kpi-change ${s.dir}`}>
                  <TrendingUp size={12} />{s.change}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="card">
              <div className="card-header"><div className="card-title">Revenue Trend</div><div className="card-subtitle">7-month</div></div>
              <div style={{ padding: "14px 16px 12px" }}>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
                    <defs>
                      <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a3557" stopOpacity={0.12} />
                        <stop offset="95%" stopColor="#1a3557" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 3" stroke="#edf0f3" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10.5, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v=>`${(v/1000000).toFixed(1)}M`} />
                    <Tooltip contentStyle={{ borderRadius: 5, border: "1px solid var(--border)", fontSize: 12.5 }}
                      formatter={(v) => `KES ${(Number(v)/1000).toFixed(0)}K`} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#1a3557" fill="url(#rg)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><div className="card-title">Revenue vs Expenses</div><div className="card-subtitle">Monthly</div></div>
              <div style={{ padding: "14px 16px 12px" }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 0, bottom: 0, left: -14 }} barSize={8} barCategoryGap="35%">
                    <CartesianGrid strokeDasharray="2 3" stroke="#edf0f3" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10.5, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v=>`${(v/1000000).toFixed(1)}M`} />
                    <Tooltip contentStyle={{ borderRadius: 5, border: "1px solid var(--border)", fontSize: 12.5 }}
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
        </div>
      )}

      {/* ── Income ── */}
      {active === "income" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button className="btn btn-accent btn-sm"><Plus size={13} /> Record Income</button>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-light)", display: "flex", gap: 8 }}>
              <div className="search-input-wrap" style={{ flex: 1 }}>
                <Search size={13} className="search-icon-abs" />
                <input className="input" placeholder="Search income records…" style={{ height: 33 }} />
              </div>
              <select className="select" style={{ height: 33, fontSize: 13, width: 155 }}>
                <option>All Categories</option><option>Sales</option><option>Receivables</option><option>Asset Sale</option>
              </select>
            </div>
            <table className="data-table">
              <thead><tr><th>Reference</th><th>Source</th><th>Category</th><th>Amount</th><th>Method</th><th>Date</th><th>Description</th></tr></thead>
              <tbody>
                {INCOME_RECORDS.map(r => (
                  <tr key={r.id}>
                    <td><span className="mono text-xs" style={{ color: "var(--accent-600)" }}>{r.id}</span></td>
                    <td className="text-sm" style={{ fontWeight: 500 }}>{r.source.length>32?r.source.slice(0,32)+"…":r.source}</td>
                    <td><span className="badge badge-info" style={{ fontSize: 11 }}>{r.category}</span></td>
                    <td><span className="mono text-sm" style={{ fontWeight: 700, color: "var(--success-700)" }}>+{formatCurrency(r.amount)}</span></td>
                    <td className="text-xs" style={{ color: "var(--text-muted)" }}>{r.method}</td>
                    <td className="text-xs" style={{ color: "var(--text-muted)" }}>{r.date}</td>
                    <td className="text-xs" style={{ color: "var(--text-muted)", maxWidth: 180 }}>{r.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border-light)", background: "var(--success-50)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--success-700)" }}>Total Income</span>
              <span className="mono" style={{ fontWeight: 800, fontSize: 14, color: "var(--success-700)" }}>{formatCurrency(totalIncome)}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Expenses ── */}
      {active === "expenses" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button className="btn btn-accent btn-sm"><Plus size={13} /> Record Expense</button>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-light)", display: "flex", gap: 8 }}>
              <div className="search-input-wrap" style={{ flex: 1 }}>
                <Search size={13} className="search-icon-abs" />
                <input className="input" placeholder="Search expenses…" style={{ height: 33 }} />
              </div>
              <select className="select" style={{ height: 33, fontSize: 13, width: 155 }}>
                <option>All Categories</option><option>Rent</option><option>Utilities</option>
                <option>Salaries</option><option>Transport</option><option>Marketing</option>
              </select>
              <select className="select" style={{ height: 33, fontSize: 13, width: 130 }}>
                <option>All Status</option><option>Approved</option><option>Pending</option>
              </select>
            </div>
            <table className="data-table">
              <thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Method</th><th>Recorded By</th><th>Status</th></tr></thead>
              <tbody>
                {EXPENSES.map(e => (
                  <tr key={e.id}>
                    <td className="text-xs" style={{ color: "var(--text-muted)" }}>{e.date}</td>
                    <td><span className="badge badge-neutral" style={{ fontSize: 11 }}>{e.category}</span></td>
                    <td className="text-sm">{e.description}</td>
                    <td><span className="mono text-sm" style={{ fontWeight: 600, color: "var(--danger-700)" }}>-{formatCurrency(e.amount)}</span></td>
                    <td className="text-xs" style={{ color: "var(--text-muted)" }}>{e.method}</td>
                    <td className="text-xs">{e.recordedBy}</td>
                    <td><span className={`badge ${e.status==="approved"?"badge-success":"badge-warning"}`}>{e.status.charAt(0).toUpperCase()+e.status.slice(1)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border-light)", background: "var(--danger-50)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--danger-700)" }}>Total Expenses</span>
              <span className="mono" style={{ fontWeight: 800, fontSize: 14, color: "var(--danger-700)" }}>{formatCurrency(totalExpenses)}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Ledger ── */}
      {active === "ledger" && (
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-light)", display: "flex", gap: 8 }}>
            <div className="search-input-wrap" style={{ flex: 1 }}>
              <Search size={13} className="search-icon-abs" />
              <input className="input" placeholder="Search ledger entries…" style={{ height: 33 }} />
            </div>
            <select className="select" style={{ height: 33, fontSize: 13, width: 160 }}>
              <option>All Categories</option><option>Sales Revenue</option><option>Rent</option>
              <option>Salaries</option><option>Utilities</option><option>Stock Purchase</option>
            </select>
            <select className="select" style={{ height: 33, fontSize: 13, width: 155 }}>
              <option>All Entries</option><option>Debit Only</option><option>Credit Only</option>
            </select>
            <button className="btn btn-secondary btn-sm"><Download size={13} /> Export</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>Date</th><th>Reference</th><th>Description</th>
                <th style={{ textAlign: "right" }}>Debit</th>
                <th style={{ textAlign: "right" }}>Credit</th>
                <th style={{ textAlign: "right" }}>Balance</th>
                <th>Category</th></tr>
              </thead>
              <tbody>
                {LEDGER_ENTRIES.map(e => (
                  <tr key={e.id}>
                    <td className="text-xs" style={{ color: "var(--text-muted)" }}>{e.date}</td>
                    <td><span className="mono text-xs" style={{ color: "var(--accent-600)" }}>{e.ref}</span></td>
                    <td className="text-sm">{e.description}</td>
                    <td style={{ textAlign: "right" }}>
                      {e.debit && <span className="mono text-sm ledger-debit">{formatCurrency(e.debit)}</span>}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {e.credit && <span className="mono text-sm ledger-credit">{formatCurrency(e.credit)}</span>}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className="mono text-sm ledger-balance">{formatCurrency(e.balance)}</span>
                    </td>
                    <td><span className="badge badge-neutral" style={{ fontSize: 11 }}>{e.category}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── P&L ── */}
      {active === "profit_loss" && (
        <div style={{ maxWidth: 680 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 14 }}>
            <select className="select" style={{ height: 33, fontSize: 13, width: 140 }}>
              <option>Monthly</option><option>Quarterly</option><option>Yearly</option>
            </select>
            <button className="btn btn-secondary btn-sm"><Download size={13} /> Export PDF</button>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 22px", background: "var(--navy-900)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 17, color: "white" }}>Profit & Loss Statement</div>
                <div style={{ fontSize: 12, color: "rgba(160,185,212,0.7)", marginTop: 2 }}>January 2024 — TechMart Electronics Ltd</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 22, fontWeight: 800, color: "#4ade80" }}>KES 990,000</div>
                <div style={{ fontSize: 11.5, color: "rgba(160,185,212,0.6)" }}>Net Profit</div>
              </div>
            </div>
            {[
              { title: "Revenue", rows: [{ l:"Sales Revenue",  v:3920000,  pos:true },{ l:"Other Income", v:28000, pos:true }], totalLabel:"Total Revenue", totalVal:3948000, totalPos:true },
              { title: "Cost of Goods Sold", rows: [{ l:"Product Costs (COGS)", v:2210000, pos:false }], totalLabel:"Gross Profit", totalVal:1738000, totalPos:true, highlight:true },
              { title: "Operating Expenses", rows: [
                { l:"Rent", v:205000, pos:false },{ l:"Salaries & Wages", v:450000, pos:false },
                { l:"Utilities", v:48000, pos:false },{ l:"Marketing", v:22000, pos:false },
                { l:"Transport", v:15000, pos:false },{ l:"Other", v:8000, pos:false },
              ], totalLabel:"Net Profit", totalVal:990000, totalPos:true, main:true },
            ].map(s => (
              <div key={s.title}>
                <div style={{ padding: "8px 22px 3px", background: "var(--gray-50)", borderTop: "1px solid var(--border-light)" }}>
                  <span className="label">{s.title}</span>
                </div>
                {s.rows.map(r => (
                  <div key={r.l} style={{ padding: "8px 22px 8px 34px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)" }}>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.l}</span>
                    <span className="mono text-sm" style={{ color: r.pos?"var(--success-700)":"var(--danger-700)" }}>
                      {r.pos ? formatCurrency(r.v) : `(${formatCurrency(r.v)})`}
                    </span>
                  </div>
                ))}
                <div style={{
                  padding: "10px 22px", display: "flex", justifyContent: "space-between",
                  background: s.main ? "var(--navy-900)" : s.highlight ? "var(--navy-50)" : "var(--gray-50)",
                  borderBottom: "1px solid var(--border)"
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: s.main ? "white" : "var(--text-primary)" }}>{s.totalLabel}</span>
                  <span className="mono" style={{ fontSize: 16, fontWeight: 800, color: s.main ? "#4ade80" : s.totalPos ? "var(--success-700)" : "var(--danger-700)" }}>
                    {formatCurrency(s.totalVal)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Balance Sheet ── */}
      {active === "balance_sheet" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 900 }}>
          {/* Assets */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "12px 18px", background: "var(--navy-800)", color: "white" }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15 }}>Assets</div>
            </div>
            {[
              { group: "Current Assets", rows: [
                { l:"Cash & Bank Balance", v:2483000 },
                { l:"Accounts Receivable", v:195500 },
                { l:"Inventory", v:4790000 },
              ]},
              { group: "Non-Current Assets", rows: [
                { l:"Equipment & Fixtures", v:850000 },
                { l:"Leasehold Improvements", v:320000 },
              ]},
            ].map(g => (
              <div key={g.group}>
                <div style={{ padding: "7px 18px 3px", background: "var(--gray-50)", borderTop: "1px solid var(--border-light)" }}>
                  <span className="label">{g.group}</span>
                </div>
                {g.rows.map(r => (
                  <div key={r.l} style={{ padding: "8px 18px 8px 28px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)" }}>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.l}</span>
                    <span className="mono text-sm">{formatCurrency(r.v)}</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ padding: "11px 18px", background: "var(--navy-50)", borderTop: "1px solid var(--navy-200)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Total Assets</span>
              <span className="mono" style={{ fontWeight: 800, fontSize: 15, color: "var(--navy-800)" }}>{formatCurrency(8638500)}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Liabilities */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "12px 18px", background: "#7f1d1d", color: "white" }}>
                <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15 }}>Liabilities</div>
              </div>
              {[
                { l:"Accounts Payable", v:425000 },
                { l:"Supplier Outstanding", v:340000 },
                { l:"Business Loans", v:1200000 },
              ].map(r => (
                <div key={r.l} style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)" }}>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.l}</span>
                  <span className="mono text-sm" style={{ color: "var(--danger-700)" }}>{formatCurrency(r.v)}</span>
                </div>
              ))}
              <div style={{ padding: "10px 18px", background: "var(--danger-50)", borderTop: "1px solid #fecaca", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 13.5 }}>Total Liabilities</span>
                <span className="mono" style={{ fontWeight: 800, fontSize: 14, color: "var(--danger-700)" }}>{formatCurrency(1965000)}</span>
              </div>
            </div>
            {/* Equity */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "12px 18px", background: "#064e3b", color: "white" }}>
                <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15 }}>Equity</div>
              </div>
              {[{ l:"Business Capital", v:4500000 },{ l:"Retained Earnings", v:2173500 }].map(r => (
                <div key={r.l} style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)" }}>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.l}</span>
                  <span className="mono text-sm" style={{ color: "var(--success-700)" }}>{formatCurrency(r.v)}</span>
                </div>
              ))}
              <div style={{ padding: "10px 18px", background: "var(--success-50)", borderTop: "1px solid #bbf7d0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 13.5 }}>Total Equity</span>
                <span className="mono" style={{ fontWeight: 800, fontSize: 14, color: "var(--success-700)" }}>{formatCurrency(6673500)}</span>
              </div>
            </div>
            <div className="card" style={{ padding: "13px 18px", background: "var(--navy-800)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "white" }}>Liabilities + Equity</span>
              <span className="mono" style={{ fontWeight: 800, fontSize: 16, color: "#93c5fd" }}>{formatCurrency(8638500)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
