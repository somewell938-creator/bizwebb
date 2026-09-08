import { useState } from "react";
import { Search, Plus, Eye, Edit2 } from "lucide-react";
import { SUPPLIERS, formatCurrency } from "../data/mockData";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

export default function SuppliersPage({ ctx: _ }: Props) {
  const [search, setSearch] = useState("");

  const filtered = SUPPLIERS.filter(s => {
    const q = search.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Suppliers</div>
          <div className="page-subtitle">Manage supplier accounts, orders, and outstanding payments</div>
        </div>
        <button className="btn btn-accent btn-sm"><Plus size={14} /> Add Supplier</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-label">Total Suppliers</div><div className="stat-value" style={{ fontSize: 22 }}>{SUPPLIERS.length}</div></div>
        <div className="stat-card"><div className="stat-label">Total Purchases</div><div className="stat-value" style={{ fontSize: 20 }}>{formatCurrency(SUPPLIERS.reduce((s, x) => s + x.totalPurchases, 0))}</div></div>
        <div className="stat-card"><div className="stat-label">Outstanding Payments</div><div className="stat-value" style={{ fontSize: 20, color: "#b91c1c" }}>{formatCurrency(SUPPLIERS.reduce((s, x) => s + x.outstanding, 0))}</div></div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #eef0f4" }}>
          <div className="search-wrap" style={{ maxWidth: 320 }}>
            <Search size={15} className="search-icon" />
            <input className="input" placeholder="Search suppliers..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Supplier</th><th>Contact</th><th>Phone</th><th>Email</th><th>Products</th><th>Total Purchases</th><th>Outstanding</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</td>
                <td style={{ fontSize: 13, color: "#64748b" }}>{s.contact}</td>
                <td style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#64748b" }}>{s.phone}</td>
                <td style={{ fontSize: 12, color: "#2563eb" }}>{s.email}</td>
                <td style={{ fontSize: 13, textAlign: "center" }}>{s.products}</td>
                <td><span style={{ fontFamily: "JetBrains Mono", fontSize: 13, fontWeight: 600 }}>{formatCurrency(s.totalPurchases)}</span></td>
                <td>
                  {s.outstanding > 0
                    ? <span style={{ fontFamily: "JetBrains Mono", fontSize: 13, fontWeight: 600, color: "#b91c1c" }}>{formatCurrency(s.outstanding)}</span>
                    : <span className="badge badge-success" style={{ fontSize: 11 }}>Clear</span>
                  }
                </td>
                <td><span className={`badge ${s.status === "active" ? "badge-success" : "badge-neutral"}`}>{s.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="btn btn-ghost btn-sm"><Eye size={13} /></button>
                    <button className="btn btn-ghost btn-sm"><Edit2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
