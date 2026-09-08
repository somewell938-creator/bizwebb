import { useState } from "react";
import { Building2, Save, Camera } from "lucide-react";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

export default function BusinessProfilePage({ ctx: _ }: Props) {
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Business Profile</div>
          <div className="page-subtitle">Manage your business information and settings</div>
        </div>
        <button className="btn btn-accent btn-sm" onClick={save}>
          <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
        {/* Logo + quick info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 22, textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
              <div style={{
                width: 90, height: 90, borderRadius: "var(--radius-lg)",
                background: "var(--navy-800)", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto"
              }}>
                <Building2 size={40} color="rgba(255,255,255,0.5)" />
              </div>
              <button style={{
                position: "absolute", bottom: -6, right: -6,
                width: 28, height: 28, borderRadius: "50%",
                background: "var(--accent-600)", border: "2px solid white",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer"
              }}>
                <Camera size={12} color="white" />
              </button>
            </div>
            <div style={{ fontFamily: "Outfit", fontSize: 17, fontWeight: 700 }}>TechMart Electronics Ltd</div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 4 }}>Electronics Retail</div>
            <span className="badge badge-success" style={{ marginTop: 10 }}>Active Business</span>

            <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border-light)", display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
              {[
                { l: "Business ID", v: "BIZ-2023-0042", mono: true },
                { l: "Registration No.", v: "PVT-123456", mono: true },
                { l: "KRA PIN", v: "P051234567X", mono: true },
                { l: "Member Since", v: "March 2023" },
              ].map(r => (
                <div key={r.l}>
                  <div style={{ fontSize: 11, color: "var(--text-subtle)", marginBottom: 1 }}>{r.l}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, fontFamily: r.mono ? "JetBrains Mono" : "inherit", color: "var(--text-primary)" }}>{r.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 13.5, marginBottom: 12 }}>Business Stats</div>
            {[
              { l: "Total Branches", v: "3" },
              { l: "Total Workers", v: "22" },
              { l: "Products Listed", v: "487" },
              { l: "Active Customers", v: "134" },
            ].map(r => (
              <div key={r.l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{r.l}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Basic info */}
          <div className="card" style={{ padding: 22 }}>
            <div className="section-title">Business Information</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="input-group" style={{ gridColumn: "1/-1" }}>
                <label className="input-label">Business Name</label>
                <input className="input" defaultValue="TechMart Electronics Ltd" />
              </div>
              <div className="input-group">
                <label className="input-label">Business Category</label>
                <select className="select">
                  <option>Electronics Retail</option>
                  <option>Wholesale Distribution</option>
                  <option>General Retail</option>
                  <option>Hardware Store</option>
                  <option>Supermarket</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Business Type</label>
                <select className="select">
                  <option>Private Limited Company</option>
                  <option>Sole Proprietorship</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input className="input" defaultValue="+254 20 123 4567" />
              </div>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input className="input" type="email" defaultValue="info@techmart.co.ke" />
              </div>
              <div className="input-group">
                <label className="input-label">Website</label>
                <input className="input" placeholder="https://www.yoursite.co.ke" />
              </div>
              <div className="input-group">
                <label className="input-label">Business Registration No.</label>
                <input className="input" defaultValue="PVT-123456" style={{ fontFamily: "JetBrains Mono" }} />
              </div>
              <div className="input-group" style={{ gridColumn: "1/-1" }}>
                <label className="input-label">Business Description</label>
                <textarea className="textarea" defaultValue="TechMart Electronics Ltd is a leading electronics retailer in Nairobi, Kenya. We specialize in consumer electronics, computers, home appliances, and accessories from top global brands." />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card" style={{ padding: 22 }}>
            <div className="section-title">Location & Address</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="input-group" style={{ gridColumn: "1/-1" }}>
                <label className="input-label">Primary Address</label>
                <input className="input" defaultValue="Moi Avenue, Nairobi CBD, Nairobi" />
              </div>
              <div className="input-group">
                <label className="input-label">City</label>
                <input className="input" defaultValue="Nairobi" />
              </div>
              <div className="input-group">
                <label className="input-label">Country</label>
                <select className="select">
                  <option>Kenya</option>
                  <option>Uganda</option>
                  <option>Tanzania</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial settings */}
          <div className="card" style={{ padding: 22 }}>
            <div className="section-title">Financial Settings</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              <div className="input-group">
                <label className="input-label">Currency</label>
                <select className="select">
                  <option>KES — Kenyan Shilling</option>
                  <option>USD — US Dollar</option>
                  <option>UGX — Ugandan Shilling</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Default VAT Rate (%)</label>
                <input className="input" type="number" defaultValue="16" />
              </div>
              <div className="input-group">
                <label className="input-label">KRA PIN</label>
                <input className="input" defaultValue="P051234567X" style={{ fontFamily: "JetBrains Mono" }} />
              </div>
            </div>
          </div>

          {/* Owner info */}
          <div className="card" style={{ padding: 22 }}>
            <div className="section-title">Business Owner Information</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="input-group">
                <label className="input-label">Owner Full Name</label>
                <input className="input" defaultValue="James Okafor" />
              </div>
              <div className="input-group">
                <label className="input-label">Owner Email</label>
                <input className="input" defaultValue="owner@bizledger.com" />
              </div>
              <div className="input-group">
                <label className="input-label">Owner Phone</label>
                <input className="input" defaultValue="+254 712 345 678" />
              </div>
              <div className="input-group">
                <label className="input-label">National ID / Passport</label>
                <input className="input" placeholder="ID or Passport number" />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-accent btn-lg" onClick={save}>
              <Save size={15} /> {saved ? "Changes Saved!" : "Save Business Profile"}
            </button>
            <button className="btn btn-secondary btn-lg">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
