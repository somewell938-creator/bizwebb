import { useState } from "react";
import { Search, Plus, Edit2, Trash2, X, UserCheck } from "lucide-react";
import { WORKERS, BRANCHES } from "../data/mockData";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

export default function WorkersPage({ ctx: _ }: Props) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);

  const roles = ["All", ...Array.from(new Set(WORKERS.map(w => w.role)))];
  const branches = ["All", ...BRANCHES.map(b => b.name)];

  const filtered = WORKERS.filter(w => {
    const q = search.toLowerCase();
    const matchSearch = !q || w.name.toLowerCase().includes(q) || w.email.toLowerCase().includes(q);
    const matchRole = roleFilter === "All" || w.role === roleFilter;
    const matchBranch = branchFilter === "All" || w.branch === branchFilter;
    return matchSearch && matchRole && matchBranch;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Workers</div>
          <div className="page-subtitle">Manage your team members, roles, and branch assignments</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary btn-sm">Export</button>
          <button className="btn btn-accent btn-sm" onClick={() => setShowAdd(true)}>
            <Plus size={14} /> Add Worker
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Workers", value: WORKERS.length },
          { label: "Active", value: WORKERS.filter(w => w.status === "active").length, color: "#15803d" },
          { label: "Inactive", value: WORKERS.filter(w => w.status === "inactive").length, color: "#64748b" },
          { label: "Branches", value: BRANCHES.length },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22, color: s.color || "var(--foreground)" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        {/* Filters */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #eef0f4", display: "flex", gap: 10 }}>
          <div className="search-wrap" style={{ flex: 1 }}>
            <Search size={15} className="search-icon" />
            <input className="input" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>
          <select className="select" value={branchFilter} onChange={e => setBranchFilter(e.target.value)}>
            {branches.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned Branch</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(w => (
              <tr key={w.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%", background: "#1a3557",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0
                    }}>
                      {w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1f2e" }}>{w.name}</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-info" style={{ fontSize: 11.5 }}>{w.role}</span></td>
                <td style={{ fontSize: 13, color: "#3d4a5c" }}>{w.email}</td>
                <td style={{ fontSize: 13, color: "#64748b", fontFamily: "JetBrains Mono" }}>{w.phone}</td>
                <td style={{ fontSize: 13 }}>{w.branch}</td>
                <td>
                  <span className={`badge ${w.status === "active" ? "badge-success" : "badge-neutral"}`}>
                    {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: "#64748b" }}>{w.lastActive}</td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="btn btn-ghost btn-sm" title="Edit"><Edit2 size={13} /></button>
                    <button className="btn btn-ghost btn-sm" title="Deactivate" style={{ color: "#b91c1c" }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: "10px 16px", borderTop: "1px solid #eef0f4", display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#64748b" }}>
          <span>Showing {filtered.length} of {WORKERS.length} workers</span>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-secondary btn-sm">Previous</button>
            <button className="btn btn-secondary btn-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Add Worker Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" style={{ width: 560 }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid #eef0f4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <UserCheck size={18} color="#1a3557" />
                <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 16 }}>Add New Worker</span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}><X size={16} /></button>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Full Name", type: "text", placeholder: "Enter full name" },
                { label: "Email Address", type: "email", placeholder: "worker@email.com" },
                { label: "Phone Number", type: "tel", placeholder: "+254 7XX XXX XXX" },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>{f.label}</label>
                  <input className="input" type={f.type} placeholder={f.placeholder} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>Assigned Role</label>
                  <select className="select" style={{ width: "100%" }}>
                    <option>Cashier</option>
                    <option>Stock Manager</option>
                    <option>Manager</option>
                    <option>Admin</option>
                    <option>Worker</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>Assigned Branch</label>
                  <select className="select" style={{ width: "100%" }}>
                    {BRANCHES.map(b => <option key={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>Temporary Password</label>
                <input className="input" type="password" placeholder="Set initial password" />
                <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 4 }}>Worker will be prompted to change this on first login.</div>
              </div>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>Account Status</label>
                <select className="select" style={{ width: "100%" }}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ padding: "14px 24px", borderTop: "1px solid #eef0f4", display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-accent">Add Worker</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
