import { useState } from "react";
import { Plus, GitBranch, Users, TrendingUp, X, MapPin } from "lucide-react";
import { BRANCHES, WORKERS, formatCurrency } from "../data/mockData";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

export default function BranchesPage({ ctx: _ }: Props) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Branch Management</div>
          <div className="page-subtitle">Manage your business locations and branch performance</div>
        </div>
        <button className="btn btn-accent btn-sm" onClick={() => setShowAdd(true)}>
          <Plus size={14} /> Add Branch
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-label">Total Branches</div><div className="stat-value" style={{ fontSize: 22 }}>{BRANCHES.length}</div></div>
        <div className="stat-card"><div className="stat-label">Total Workers</div><div className="stat-value" style={{ fontSize: 22 }}>{BRANCHES.reduce((s, b) => s + b.workers, 0)}</div></div>
        <div className="stat-card"><div className="stat-label">Combined Today Sales</div><div className="stat-value" style={{ fontSize: 20 }}>{formatCurrency(BRANCHES.reduce((s, b) => s + b.todaySales, 0))}</div></div>
      </div>

      {/* Branch cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {BRANCHES.map(b => {
          const branchWorkers = WORKERS.filter(w => w.branch === b.name);
          return (
            <div key={b.id} className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", background: "#1a3557", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GitBranch size={18} color="white" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: "white" }}>{b.name}</div>
                    <div style={{ fontSize: 11.5, color: "#7fa8d0" }}>Branch Manager: {b.manager}</div>
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: 11 }}>Active</span>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, fontSize: 12.5, color: "#64748b" }}>
                  <MapPin size={13} />{b.location}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: "#f4f5f7", borderRadius: 4, padding: "10px 12px" }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Today Sales</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 15, fontWeight: 700, color: "#1a3557" }}>
                      {formatCurrency(b.todaySales)}
                    </div>
                  </div>
                  <div style={{ background: "#f4f5f7", borderRadius: 4, padding: "10px 12px" }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Stock Value</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 15, fontWeight: 700, color: "#1a3557" }}>
                      {formatCurrency(b.stockValue)}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 14, borderTop: "1px solid #eef0f4", paddingTop: 12 }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    <Users size={13} /> {b.workers} Workers
                  </div>
                  <div style={{ display: "flex", gap: -6 }}>
                    {branchWorkers.slice(0, 5).map((w, i) => (
                      <div key={w.id} style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: `hsl(${i * 60 + 210}, 45%, 35%)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 700, color: "white",
                        border: "2px solid white",
                        marginLeft: i > 0 ? -8 : 0
                      }}>
                        {w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                    ))}
                    {branchWorkers.length > 5 && (
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", background: "#e2e6ea",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, color: "#64748b", marginLeft: -8, border: "2px solid white"
                      }}>+{branchWorkers.length - 5}</div>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: "center" }}>View Details</button>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }}>Switch to Branch</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" style={{ width: 520 }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid #eef0f4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 16 }}>Add New Branch</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}><X size={16} /></button>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {["Branch Name", "Location / Address", "Branch Manager"].map(f => (
                <div key={f}>
                  <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>{f}</label>
                  <input className="input" placeholder={`Enter ${f.toLowerCase()}`} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>Branch Status</label>
                <select className="select" style={{ width: "100%" }}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ padding: "14px 24px", borderTop: "1px solid #eef0f4", display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-accent">Add Branch</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
