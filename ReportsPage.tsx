import { Download, FileText, BarChart2, Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

const REPORT_CATEGORIES = [
  {
    title: "Sales Reports",
    icon: <ShoppingCart size={20} />,
    color: "#1a3557",
    reports: [
      { name: "Daily Sales Report", description: "Detailed breakdown of all sales for a specific day" },
      { name: "Sales by Product", description: "Which products are selling the most" },
      { name: "Sales by Cashier", description: "Performance report per cashier" },
      { name: "Sales by Branch", description: "Comparative sales across all branches" },
      { name: "Payment Method Report", description: "Cash, card, mobile money breakdown" },
    ]
  },
  {
    title: "Inventory Reports",
    icon: <Package size={20} />,
    color: "#0369a1",
    reports: [
      { name: "Stock Level Report", description: "Current stock levels for all products" },
      { name: "Low Stock Alert Report", description: "Products that need restocking" },
      { name: "Stock Movement Report", description: "All stock additions, sales, and adjustments" },
      { name: "Inventory Valuation", description: "Total value of current inventory at cost and retail" },
      { name: "Damaged Stock Report", description: "Record of all damaged or written-off stock" },
    ]
  },
  {
    title: "Financial Reports",
    icon: <DollarSign size={20} />,
    color: "#15803d",
    reports: [
      { name: "Profit & Loss Statement", description: "Revenue, expenses, and net profit summary" },
      { name: "Balance Sheet", description: "Assets, liabilities, and equity overview" },
      { name: "Cash Flow Statement", description: "Movement of cash in and out of the business" },
      { name: "Expense Report", description: "Detailed breakdown of all business expenses" },
      { name: "Income Report", description: "All income sources and amounts" },
    ]
  },
  {
    title: "Worker Reports",
    icon: <Users size={20} />,
    color: "#7c3aed",
    reports: [
      { name: "Worker Performance Report", description: "Individual performance metrics per worker" },
      { name: "Attendance Report", description: "Login activity and working hours" },
      { name: "Sales by Worker", description: "Sales attributed to each team member" },
    ]
  },
  {
    title: "Customer Reports",
    icon: <Users size={20} />,
    color: "#b45309",
    reports: [
      { name: "Customer Purchase History", description: "Complete purchase records per customer" },
      { name: "Outstanding Balances", description: "Customers with unpaid balances" },
      { name: "Top Customers Report", description: "Highest value customers by purchase amount" },
    ]
  },
];

export default function ReportsPage({ ctx: _ }: Props) {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Reports Center</div>
          <div className="page-subtitle">Generate, preview, and export business reports</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input type="date" className="input" style={{ width: 160, fontSize: 13 }} defaultValue="2024-01-15" />
          <input type="date" className="input" style={{ width: 160, fontSize: 13 }} defaultValue="2024-01-15" />
        </div>
      </div>

      {/* Quick reports */}
      <div style={{ background: "white", border: "1px solid #dde1e8", borderRadius: 5, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 14, marginBottom: 12, color: "#1a1f2e" }}>Quick Generate</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Today's Summary", "This Week", "This Month", "Last Month", "Q1 2024", "Full Year 2024"].map(label => (
            <button key={label} className="btn btn-secondary btn-sm">
              <FileText size={13} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Report categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {REPORT_CATEGORIES.map(cat => (
          <div key={cat.title} className="card" style={{ overflow: "hidden" }}>
            <div style={{
              padding: "12px 18px",
              display: "flex", alignItems: "center", gap: 10,
              borderBottom: "1px solid #eef0f4",
              background: "#f8f9fb"
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 6,
                background: cat.color, display: "flex", alignItems: "center",
                justifyContent: "center", color: "white"
              }}>
                {cat.icon}
              </div>
              <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 14.5, color: "#1a1f2e" }}>{cat.title}</div>
            </div>
            <div>
              {cat.reports.map((r, i) => (
                <div key={r.name} style={{
                  padding: "12px 18px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderBottom: i < cat.reports.length - 1 ? "1px solid #f4f5f7" : "none",
                }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1f2e" }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{r.description}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 16 }}>
                    <button className="btn btn-secondary btn-sm">Preview</button>
                    <button className="btn btn-ghost btn-sm" title="Download PDF"><Download size={13} /></button>
                    <button className="btn btn-accent btn-sm">Generate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
