import { useState } from "react";
import { User, Lock, Bell, LogOut, Edit2, Shield, GitBranch, Clock } from "lucide-react";
import { ROLE_PERMISSIONS } from "../data/mockData";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

export default function ProfilePage({ ctx }: Props) {
  const { user, logout, permissions } = ctx;
  const [editing, setEditing] = useState(false);

  const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">My Profile</div>
        {!editing && (
          <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
            <Edit2 size={13} /> Edit Profile
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
        {/* Left card */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 24, textAlign: "center" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", background: "#1a3557",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 700, color: "white", margin: "0 auto 14px"
            }}>
              {initials}
            </div>
            <div style={{ fontFamily: "Outfit", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{user.name}</div>
            <div style={{ fontSize: 13.5, color: "#64748b", marginBottom: 10 }}>{user.position}</div>
            <span className="badge badge-success" style={{ margin: "0 auto" }}>Active</span>

            <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid #eef0f4", display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
              {[
                { icon: <Shield size={13} />, label: "Role", value: user.role.replace("_", " ").toUpperCase() },
                { icon: <GitBranch size={13} />, label: "Branch", value: user.branch },
                { icon: <Clock size={13} />, label: "Last Login", value: user.lastLogin },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "#64748b", marginTop: 1, flexShrink: 0 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#9faab8" }}>{r.label}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: "#1a1f2e" }}>{r.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 16, overflow: "hidden" }}>
            {[
              { icon: <Lock size={14} />, label: "Change Password" },
              { icon: <Bell size={14} />, label: "Notifications" },
              { icon: <LogOut size={14} />, label: "Sign Out", danger: true, action: logout },
            ].map(item => (
              <button key={item.label}
                onClick={item.action}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%",
                  padding: "9px 10px", background: "none", border: "none",
                  cursor: "pointer", fontSize: 13.5, borderRadius: 4,
                  color: item.danger ? "#b91c1c" : "#374151",
                  marginBottom: 2
                }}
                onMouseEnter={e => (e.currentTarget.style.background = item.danger ? "#fee2e2" : "#f4f5f7")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {item.icon}{item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 15, marginBottom: 18 }}>
              {editing ? "Edit Profile Information" : "Profile Information"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { label: "Full Name", value: user.name },
                { label: "Position", value: user.position },
                { label: "Email Address", value: user.email },
                { label: "Phone Number", value: user.phone },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 12.5, fontWeight: 500, color: "#64748b", display: "block", marginBottom: 5 }}>{f.label}</label>
                  {editing
                    ? <input className="input" defaultValue={f.value} />
                    : <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1f2e" }}>{f.value}</div>
                  }
                </div>
              ))}
            </div>
            {editing && (
              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <button className="btn btn-accent">Save Changes</button>
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 15, marginBottom: 14 }}>My Permissions</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
              {permissions.length} permissions assigned to your role
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {permissions.map(p => (
                <span key={p} className="badge badge-info" style={{ fontSize: 11.5 }}>
                  {p.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
