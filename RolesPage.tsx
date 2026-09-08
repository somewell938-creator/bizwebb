import { useState } from "react";
import { Shield, Plus, Edit2, Check, X as XIcon } from "lucide-react";
import { PERMISSIONS, ROLE_PERMISSIONS } from "../data/mockData";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

const ROLE_CONFIGS = [
  { id: "owner", name: "Business Owner", description: "Full access to all features and settings", color: "#1a3557", users: 1 },
  { id: "admin", name: "Administrator", description: "Manages daily operations with broad access", color: "#0369a1", users: 1 },
  { id: "manager", name: "Manager", description: "Oversees branch operations and team", color: "#7c3aed", users: 1 },
  { id: "cashier", name: "Cashier", description: "POS, sales, and customer-facing operations", color: "#15803d", users: 2 },
  { id: "stock_manager", name: "Stock Manager", description: "Inventory, stock, and supplier management", color: "#b45309", users: 2 },
  { id: "worker", name: "General Worker", description: "Limited access based on assigned tasks", color: "#64748b", users: 1 },
];

const PERM_LABELS: Record<string, string> = {
  view_sales: "View Sales",
  create_sale: "Create Sale",
  edit_sale: "Edit Sale",
  delete_sale: "Delete Sale",
  approve_sale: "Approve Sale",
  export_sales: "Export Sales",
  view_inventory: "View Inventory",
  add_stock: "Add Stock",
  edit_inventory: "Edit Inventory",
  delete_product: "Delete Product",
  adjust_stock: "Adjust Stock",
  export_inventory: "Export Inventory",
  view_income: "View Income",
  view_expenses: "View Expenses",
  view_ledger: "View Ledger",
  view_profit_loss: "View P&L",
  view_balance_sheet: "View Balance Sheet",
  manage_finance: "Manage Finance",
  view_workers: "View Workers",
  add_worker: "Add Worker",
  edit_worker: "Edit Worker",
  delete_worker: "Delete Worker",
  manage_roles: "Manage Roles",
  view_customers: "View Customers",
  add_customer: "Add Customer",
  edit_customer: "Edit Customer",
  delete_customer: "Delete Customer",
  view_suppliers: "View Suppliers",
  add_supplier: "Add Supplier",
  edit_supplier: "Edit Supplier",
  manage_suppliers: "Manage Suppliers",
  view_reports: "View Reports",
  export_reports: "Export Reports",
  generate_reports: "Generate Reports",
  view_branches: "View Branches",
  manage_branches: "Manage Branches",
  view_settings: "View Settings",
  manage_settings: "Manage Settings",
};

export default function RolesPage({ ctx: _ }: Props) {
  const [selectedRole, setSelectedRole] = useState("owner");
  const [activeTab, setActiveTab] = useState<"overview" | "permissions">("overview");

  const roleConfig = ROLE_CONFIGS.find(r => r.id === selectedRole)!;
  const rolePerms = ROLE_PERMISSIONS[selectedRole as keyof typeof ROLE_PERMISSIONS] || [];

  const allPerms = Object.values(PERMISSIONS).flat();

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Roles & Permissions</div>
          <div className="page-subtitle">Configure access control for each role in your business</div>
        </div>
        <button className="btn btn-accent btn-sm"><Plus size={14} /> Create Custom Role</button>
      </div>

      <div className="tab-bar">
        <div className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Role Overview</div>
        <div className={`tab ${activeTab === "permissions" ? "active" : ""}`} onClick={() => setActiveTab("permissions")}>Permission Matrix</div>
      </div>

      {activeTab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
            {/* Role list */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #eef0f4" }}>
                <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 13.5 }}>System Roles</span>
              </div>
              {ROLE_CONFIGS.map(r => (
                <div key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  style={{
                    padding: "12px 16px", cursor: "pointer",
                    borderBottom: "1px solid #f4f5f7",
                    background: selectedRole === r.id ? "#eff6ff" : "white",
                    borderLeft: selectedRole === r.id ? "3px solid #2563eb" : "3px solid transparent",
                    transition: "all 0.15s"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: r.color, display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0
                    }}>
                      <Shield size={13} color="white" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1f2e" }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{r.users} user{r.users !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Permission detail */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{
                padding: "14px 20px", borderBottom: "1px solid #eef0f4",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: roleConfig.color + "10"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: roleConfig.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Shield size={18} color="white" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 16, color: "#1a1f2e" }}>{roleConfig.name}</div>
                    <div style={{ fontSize: 12.5, color: "#64748b" }}>{roleConfig.description}</div>
                  </div>
                </div>
                {selectedRole !== "owner" && <button className="btn btn-secondary btn-sm"><Edit2 size={13} /> Edit Permissions</button>}
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
                  {rolePerms.length} of {allPerms.length} permissions granted
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
                  {allPerms.map(perm => {
                    const has = rolePerms.includes(perm);
                    return (
                      <div key={perm} style={{
                        display: "flex", alignItems: "center", gap: 7,
                        padding: "6px 10px", borderRadius: 4,
                        background: has ? "#f0fdf4" : "#f8f9fb",
                        border: `1px solid ${has ? "#bbf7d0" : "#eef0f4"}`
                      }}>
                        {has
                          ? <Check size={12} color="#15803d" style={{ flexShrink: 0 }} />
                          : <XIcon size={12} color="#d1d5db" style={{ flexShrink: 0 }} />
                        }
                        <span style={{ fontSize: 12, color: has ? "#15803d" : "#9faab8", fontWeight: has ? 500 : 400 }}>
                          {PERM_LABELS[perm] || perm}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "permissions" && (
        <div className="card" style={{ overflow: "auto" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #eef0f4" }}>
            <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 14 }}>Permission Matrix — All Roles</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="perm-matrix" style={{ minWidth: 800 }}>
              <thead>
                <tr>
                  <th style={{ width: 200, textAlign: "left" }}>Permission</th>
                  {ROLE_CONFIGS.map(r => (
                    <th key={r.id} style={{ minWidth: 90 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Shield size={11} color="white" />
                        </div>
                        <span style={{ fontSize: 11, whiteSpace: "nowrap" }}>{r.name.split(" ")[0]}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(PERMISSIONS).map(([cat, perms]) => (
                  <>
                    <tr key={`${cat}-header`} style={{ background: "#f8f9fb" }}>
                      <td colSpan={7} style={{ fontSize: 10.5, fontWeight: 600, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", padding: "7px 14px" }}>
                        {cat.replace("_", " ")}
                      </td>
                    </tr>
                    {perms.map(perm => (
                      <tr key={perm}>
                        <td style={{ fontSize: 12.5 }}>{PERM_LABELS[perm] || perm}</td>
                        {ROLE_CONFIGS.map(r => {
                          const rPerms = ROLE_PERMISSIONS[r.id as keyof typeof ROLE_PERMISSIONS] || [];
                          const has = rPerms.includes(perm);
                          return (
                            <td key={r.id} style={{ textAlign: "center" }}>
                              {has
                                ? <Check size={14} color="#15803d" style={{ margin: "0 auto" }} />
                                : <div style={{ width: 14, height: 14, margin: "0 auto", borderRadius: "50%", background: "#f0f0f0" }} />
                              }
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
