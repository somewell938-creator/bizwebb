import { useState } from "react";
import {
  Settings, Building2, User, Bell, Shield, Receipt,
  CreditCard, Globe, Database, Save
} from "lucide-react";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

const SETTING_SECTIONS = [
  { id: "general", label: "General Settings", icon: <Settings size={15} /> },
  { id: "business", label: "Business Settings", icon: <Building2 size={15} /> },
  { id: "users", label: "User Settings", icon: <User size={15} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={15} /> },
  { id: "security", label: "Security", icon: <Shield size={15} /> },
  { id: "tax", label: "Tax Settings", icon: <Receipt size={15} /> },
  { id: "payment", label: "Payment Methods", icon: <CreditCard size={15} /> },
  { id: "receipt", label: "Receipt Settings", icon: <Receipt size={15} /> },
  { id: "integrations", label: "Integrations", icon: <Globe size={15} /> },
  { id: "data", label: "Data Management", icon: <Database size={15} /> },
];

export default function SettingsPage({ ctx }: Props) {
  const [section, setSection] = useState("general");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Settings</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}>
        {/* Sidebar */}
        <div className="card" style={{ overflow: "hidden", alignSelf: "start" }}>
          {SETTING_SECTIONS.map(s => (
            <div key={s.id}
              onClick={() => setSection(s.id)}
              style={{
                padding: "10px 14px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                borderBottom: "1px solid #f4f5f7",
                background: section === s.id ? "#eff6ff" : "white",
                borderLeft: `3px solid ${section === s.id ? "#2563eb" : "transparent"}`,
                fontSize: 13.5,
                color: section === s.id ? "#1d4ed8" : "#374151",
                fontWeight: section === s.id ? 500 : 400,
              }}>
              {s.icon}{s.label}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: 28 }}>
          {section === "general" && (
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 16, marginBottom: 20 }}>General Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Business Currency</label>
                  <select className="select" style={{ width: "100%" }} defaultValue="KES">
                    <option value="KES">KES — Kenyan Shilling</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="UGX">UGX — Ugandan Shilling</option>
                    <option value="TZS">TZS — Tanzanian Shilling</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Timezone</label>
                  <select className="select" style={{ width: "100%" }} defaultValue="Africa/Nairobi">
                    <option value="Africa/Nairobi">Africa/Nairobi (EAT +3)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Date Format</label>
                  <select className="select" style={{ width: "100%" }}>
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Language</label>
                  <select className="select" style={{ width: "100%" }}>
                    <option>English</option>
                    <option>Swahili</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #eef0f4" }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>Dark Mode</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Switch to dark interface theme</div>
                  </div>
                  <button className="toggle off" onClick={e => e.currentTarget.classList.toggle("on")} />
                </div>
              </div>
            </div>
          )}

          {section === "business" && (
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 16, marginBottom: 20 }}>Business Settings</div>
              <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                <div style={{
                  width: 80, height: 80, background: "#f4f5f7", borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px dashed #dde1e8", cursor: "pointer", flexShrink: 0
                }}>
                  <Building2 size={24} color="#9faab8" />
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>Business Logo</div>
                  <div style={{ fontSize: 12.5, color: "#64748b", marginBottom: 8 }}>Upload your business logo. PNG, JPG, SVG. Max 2MB.</div>
                  <button className="btn btn-secondary btn-sm">Upload Logo</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 600 }}>
                {[
                  { label: "Business Name", value: "TechMart Electronics Ltd" },
                  { label: "Business Category", value: "Electronics Retail" },
                  { label: "Phone Number", value: "+254 20 123 4567" },
                  { label: "Email Address", value: "info@techmart.co.ke" },
                  { label: "KRA PIN", value: "P051234567X" },
                  { label: "Business Registration No.", value: "PVT-123456" },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input className="input" defaultValue={f.value} />
                  </div>
                ))}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 12.5, fontWeight: 500, display: "block", marginBottom: 5 }}>Business Address</label>
                  <textarea className="input" rows={3} defaultValue="Moi Avenue, Nairobi CBD, Nairobi, Kenya" style={{ resize: "vertical" }} />
                </div>
              </div>
            </div>
          )}

          {section === "notifications" && (
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 16, marginBottom: 20 }}>Notification Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "Low Stock Alerts", description: "Notify when products fall below minimum stock", on: true },
                  { label: "Out of Stock Alerts", description: "Notify when products reach zero stock", on: true },
                  { label: "New Sale Completed", description: "Notify after every completed sale", on: false },
                  { label: "Payment Received", description: "Notify when outstanding payments are received", on: true },
                  { label: "New Worker Added", description: "Notify when a new team member is added", on: true },
                  { label: "Expense Recorded", description: "Notify when a new expense is recorded", on: false },
                  { label: "Unusual Activity", description: "Security alerts for suspicious account activity", on: true },
                  { label: "Daily Summary", description: "Receive a daily business summary report", on: true },
                ].map((item, i) => (
                  <div key={item.label} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 0", borderBottom: "1px solid #f4f5f7"
                  }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1f2e" }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{item.description}</div>
                    </div>
                    <button className={`toggle ${item.on ? "on" : "off"}`}
                      onClick={e => {
                        e.currentTarget.classList.contains("on")
                          ? (e.currentTarget.classList.remove("on"), e.currentTarget.classList.add("off"))
                          : (e.currentTarget.classList.remove("off"), e.currentTarget.classList.add("on"));
                      }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === "security" && (
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 16, marginBottom: 20 }}>Security Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
                <div style={{ padding: 16, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 5 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#15803d", marginBottom: 4 }}>Account Security: Good</div>
                  <div style={{ fontSize: 12.5, color: "#64748b" }}>Your account is protected with a strong password.</div>
                </div>
                {[
                  { label: "Two-Factor Authentication (2FA)", description: "Add an extra layer of security to your account", on: false },
                  { label: "Session Timeout", description: "Automatically log out after 30 minutes of inactivity", on: true },
                  { label: "Login Activity Alerts", description: "Get notified of new logins to your account", on: true },
                  { label: "IP Restriction", description: "Restrict access to specific IP addresses", on: false },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #eef0f4" }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{item.description}</div>
                    </div>
                    <button className={`toggle ${item.on ? "on" : "off"}`}
                      onClick={e => {
                        e.currentTarget.classList.contains("on")
                          ? (e.currentTarget.classList.replace("on", "off"))
                          : (e.currentTarget.classList.replace("off", "on"));
                      }} />
                  </div>
                ))}
                <div>
                  <button className="btn btn-secondary">Change Password</button>
                </div>
              </div>
            </div>
          )}

          {section === "tax" && (
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 16, marginBottom: 20 }}>Tax Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Default Tax Rate (%)</label>
                  <input className="input" defaultValue="16" type="number" />
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Standard VAT rate in Kenya</div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Tax Registration Number (KRA PIN)</label>
                  <input className="input" defaultValue="P051234567X" />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #eef0f4" }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>Include VAT in Prices</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Show VAT-inclusive prices on POS</div>
                  </div>
                  <button className="toggle on" />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #eef0f4" }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>Print Tax on Receipts</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Show VAT breakdown on customer receipts</div>
                  </div>
                  <button className="toggle on" />
                </div>
              </div>
            </div>
          )}

          {!["general", "business", "notifications", "security", "tax"].includes(section) && (
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 16, marginBottom: 20 }}>
                {SETTING_SECTIONS.find(s => s.id === section)?.label}
              </div>
              <div style={{ padding: 32, textAlign: "center", color: "#64748b" }}>
                <Settings size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                <div style={{ fontSize: 14, fontWeight: 500 }}>Configuration options</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>This section can be customized for your business needs.</div>
              </div>
            </div>
          )}

          {/* Save */}
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #eef0f4", display: "flex", gap: 8 }}>
            <button className="btn btn-accent" onClick={save}>
              <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
            </button>
            <button className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
