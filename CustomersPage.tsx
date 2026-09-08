import { useState } from "react";
import { Search, Plus, Eye, Edit2 } from "lucide-react";
import { CUSTOMERS, TRANSACTIONS, formatCurrency } from "../data/mockData";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

export default function CustomersPage({ ctx: _ }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof CUSTOMERS[0] | null>(null);

  const filtered = CUSTOMERS.filter(c => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
  });

  if (selected) {
    const txns = TRANSACTIONS.filter(t => t.customer === selected.name);
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>Back</button>
          <div className="page-title">{selected.name}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Customer Information</div>
              {[
                { label: "Full Name", value: selected.name },
                { label: "Phone", value: selected.phone },
                { label: "Email", value: selected.email },
                { label: "Status", value: selected.status },
                { label: "Last Purchase", value: selected.lastPurchase },
              ].map(r => (
                <div key={r.label} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11.5, color: "#64748b", marginBottom: 2 }}>{r.label}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1f2e" }}>{r.value}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Financial Summary</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11.5, color: "#64748b", marginBottom: 2 }}>Total Purchases</div>
                <div style={{ fontFamily: "JetBrains Mono", fontSize: 18, fontWeight: 700, color: "#1a3557" }}>{formatCurrency(selected.totalPurchases)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11.5, color: "#64748b", marginBottom: 2 }}>Outstanding Balance</div>
                <div style={{ fontFamily: "JetBrains Mono", fontSize: 18, fontWeight: 700, color: selected.balance > 0 ? "#b91c1c" : "#15803d" }}>
                  {selected.balance > 0 ? formatCurrency(selected.balance) : "No Balance"}
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #eef0f4" }}>
              <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 14 }}>Purchase History</span>
            </div>
            {txns.length > 0 ? (
              <table>
                <thead><tr><th>Transaction ID</th><th>Payment</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {txns.map(t => (
                    <tr key={t.id}>
                      <td><span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#2563eb" }}>{t.id}</span></td>
                      <td style={{ fontSize: 13 }}>{t.paymentMethod}</td>
                      <td><span style={{ fontFamily: "JetBrains Mono", fontWeight: 600, fontSize: 13 }}>{formatCurrency(t.amount)}</span></td>
                      <td><span className={`badge ${t.status === "completed" ? "badge-success" : t.status === "pending" ? "badge-warning" : "badge-danger"}`}>{t.status}</span></td>
                      <td style={{ fontSize: 12, color: "#64748b" }}>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>No transaction history found</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Customers</div>
          <div className="page-subtitle">Manage customer accounts, purchase history, and balances</div>
        </div>
        <button className="btn btn-accent btn-sm"><Plus size={14} /> Add Customer</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-label">Total Customers</div><div className="stat-value" style={{ fontSize: 22 }}>{CUSTOMERS.length}</div></div>
        <div className="stat-card"><div className="stat-label">Active Customers</div><div className="stat-value" style={{ fontSize: 22, color: "#15803d" }}>{CUSTOMERS.filter(c => c.status === "active").length}</div></div>
        <div className="stat-card"><div className="stat-label">Outstanding Balances</div><div className="stat-value" style={{ fontSize: 22, color: "#b91c1c" }}>{formatCurrency(CUSTOMERS.reduce((s, c) => s + c.balance, 0))}</div></div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #eef0f4" }}>
          <div className="search-wrap" style={{ maxWidth: 320 }}>
            <Search size={15} className="search-icon" />
            <input className="input" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Name</th><th>Phone</th><th>Email</th><th>Total Purchases</th><th>Balance</th><th>Last Purchase</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</td>
                <td style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#64748b" }}>{c.phone}</td>
                <td style={{ fontSize: 12.5, color: "#64748b" }}>{c.email}</td>
                <td><span style={{ fontFamily: "JetBrains Mono", fontSize: 13, fontWeight: 600 }}>{formatCurrency(c.totalPurchases)}</span></td>
                <td>
                  {c.balance > 0
                    ? <span style={{ fontFamily: "JetBrains Mono", fontSize: 13, fontWeight: 600, color: "#b91c1c" }}>{formatCurrency(c.balance)}</span>
                    : <span className="badge badge-success" style={{ fontSize: 11 }}>Clear</span>
                  }
                </td>
                <td style={{ fontSize: 12, color: "#64748b" }}>{c.lastPurchase}</td>
                <td><span className={`badge ${c.status === "active" ? "badge-success" : "badge-neutral"}`}>{c.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelected(c)}><Eye size={13} /></button>
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
