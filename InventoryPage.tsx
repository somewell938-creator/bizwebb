import { useState } from "react";
import {
  Search, Plus, Download, Package, Edit2, Eye, X, AlertTriangle
} from "lucide-react";
import { PRODUCTS, SUPPLIERS, STOCK_MOVEMENTS, formatCurrency } from "../data/mockData";
import type { AppState } from "../App";

interface Props { ctx: AppState; }
type Tab = "products" | "movement" | "adjustments";

export default function InventoryPage({ ctx: _ }: Props) {
  const [tab, setTab]           = useState<Tab>("products");
  const [search, setSearch]     = useState("");
  const [catFilter, setCat]     = useState("All");
  const [statusFilter, setStatus] = useState("All");
  const [showAdd, setShowAdd]   = useState(false);

  const cats = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filtered = PRODUCTS.filter(p => {
    const q = search.toLowerCase();
    const ms = (statusFilter === "All") ||
      (statusFilter === "In Stock"    && p.status === "in_stock") ||
      (statusFilter === "Low Stock"   && p.status === "low_stock") ||
      (statusFilter === "Out of Stock"&& p.status === "out_of_stock");
    const mc = catFilter === "All" || p.category === catFilter;
    return ms && mc && (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.barcode.includes(q));
  });

  const totalVal  = PRODUCTS.reduce((s,p) => s + p.sellingPrice * p.stock, 0);
  const costVal   = PRODUCTS.reduce((s,p) => s + p.costPrice * p.stock, 0);

  const stats = [
    { label: "Total Products",  value: PRODUCTS.length,                                          color: undefined },
    { label: "Total Units",     value: PRODUCTS.reduce((s,p)=>s+p.stock,0),                      color: undefined },
    { label: "In Stock",        value: PRODUCTS.filter(p=>p.status==="in_stock").length,          color: "var(--success-700)" },
    { label: "Low Stock",       value: PRODUCTS.filter(p=>p.status==="low_stock").length,         color: "var(--warning-700)" },
    { label: "Out of Stock",    value: PRODUCTS.filter(p=>p.status==="out_of_stock").length,      color: "var(--danger-700)" },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Inventory</div>
          <div className="page-subtitle">Manage products, stock levels, movements, and adjustments</div>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm"><Download size={13} /> Export</button>
          <button className="btn btn-accent btn-sm" onClick={() => setShowAdd(true)}>
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 14 }}>
        {stats.map(s => (
          <div key={s.label} className="kpi-card">
            <div className="kpi-label">{s.label}</div>
            <div className="kpi-value" style={{ fontSize: 22, color: s.color || "var(--text-primary)" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        <div className="kpi-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="kpi-label">Retail Inventory Value</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>{formatCurrency(totalVal)}</div>
          </div>
          <Package size={28} color="var(--gray-200)" />
        </div>
        <div className="kpi-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="kpi-label">Cost Inventory Value</div>
            <div className="kpi-value" style={{ fontSize: 20 }}>{formatCurrency(costVal)}</div>
          </div>
          <Package size={28} color="var(--gray-200)" />
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        {([["products","Products"],["movement","Stock Movement"],["adjustments","Adjustments"]] as [Tab,string][]).map(([id,label]) => (
          <div key={id} className={`tab-item ${tab===id?"active":""}`} onClick={() => setTab(id)}>{label}</div>
        ))}
      </div>

      {/* Products table */}
      {tab === "products" && (
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-light)", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div className="search-input-wrap" style={{ flex: 1, minWidth: 200 }}>
              <Search size={13} className="search-icon-abs" />
              <input className="input" placeholder="Search product, SKU, barcode…" value={search} onChange={e => setSearch(e.target.value)} style={{ height: 33 }} />
            </div>
            <select className="select" style={{ height: 33, fontSize: 13, width: 145 }} value={catFilter} onChange={e => setCat(e.target.value)}>
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="select" style={{ height: 33, fontSize: 13, width: 145 }} value={statusFilter} onChange={e => setStatus(e.target.value)}>
              {["All","In Stock","Low Stock","Out of Stock"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th><th>SKU / Barcode</th><th>Category</th>
                  <th>Cost</th><th>Price</th><th>Stock</th><th>Status</th>
                  <th>Updated</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, background: "var(--gray-100)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Package size={15} color="var(--gray-400)" />
                        </div>
                        <div>
                          <div className="text-sm" style={{ fontWeight: 500 }}>{p.name}</div>
                          <div style={{ fontSize: 11.5, color: "var(--text-subtle)" }}>{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mono text-xs" style={{ color: "var(--navy-700)", fontWeight: 600 }}>{p.sku}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: "var(--text-subtle)" }}>{p.barcode}</div>
                    </td>
                    <td><span className="badge badge-neutral" style={{ fontSize: 11 }}>{p.category}</span></td>
                    <td><span className="mono text-sm">{formatCurrency(p.costPrice)}</span></td>
                    <td><span className="mono text-sm" style={{ fontWeight: 600 }}>{formatCurrency(p.sellingPrice)}</span></td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: p.stock===0?"var(--danger-700)":p.stock<=p.minStock?"var(--warning-700)":"var(--success-700)" }}>{p.stock}</span>
                        {p.stock<=p.minStock && p.stock>0 && <AlertTriangle size={11} color="var(--warning-700)" />}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${p.status==="in_stock"?"badge-success":p.status==="low_stock"?"badge-warning":"badge-danger"}`}>
                        {p.status==="in_stock"?"In Stock":p.status==="low_stock"?"Low Stock":"Out of Stock"}
                      </span>
                    </td>
                    <td className="text-xs" style={{ color: "var(--text-muted)" }}>{p.lastUpdated}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-icon btn-sm" data-tooltip="View"><Eye size={13} /></button>
                        <button className="btn btn-ghost btn-icon btn-sm" data-tooltip="Edit"><Edit2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && (
              <div className="empty-state">
                <div className="empty-state-icon"><Package size={22} /></div>
                <div className="empty-state-title">No products found</div>
                <div className="empty-state-desc">Try adjusting your search or filters</div>
              </div>
            )}
          </div>
          <div style={{ padding: "9px 14px", borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--gray-50)" }}>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Showing {filtered.length} of {PRODUCTS.length} products</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-secondary btn-xs">Previous</button>
              <button className="btn btn-secondary btn-xs">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Stock movement */}
      {tab === "movement" && (
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-light)", display: "flex", gap: 8 }}>
            <div className="search-input-wrap" style={{ flex: 1 }}>
              <Search size={13} className="search-icon-abs" />
              <input className="input" placeholder="Search movements…" style={{ height: 33 }} />
            </div>
            <select className="select" style={{ height: 33, fontSize: 13, width: 170 }}>
              <option>All Actions</option>
              <option>Stock Added</option><option>Stock Sold</option>
              <option>Stock Adjustment</option><option>Damaged</option>
            </select>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Date</th><th>Product</th><th>Action</th><th>Qty</th><th>Previous</th><th>New Stock</th><th>Performed By</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {STOCK_MOVEMENTS.map(m => (
                <tr key={m.id}>
                  <td className="text-xs" style={{ color: "var(--text-muted)" }}>{m.date}</td>
                  <td className="text-sm" style={{ fontWeight: 500 }}>{m.product.length>30?m.product.slice(0,30)+"…":m.product}</td>
                  <td>
                    <span className={`badge ${m.action==="Stock Added"?"badge-success":m.action==="Stock Sold"?"badge-info":m.action==="Stock Adjustment"?"badge-warning":"badge-danger"}`}>
                      {m.action}
                    </span>
                  </td>
                  <td><span className="mono text-sm" style={{ fontWeight: 700, color: m.qty>0?"var(--success-700)":"var(--danger-700)" }}>{m.qty>0?"+":""}{m.qty}</span></td>
                  <td><span className="mono text-xs">{m.prevStock}</span></td>
                  <td><span className="mono text-sm" style={{ fontWeight: 600 }}>{m.newStock}</span></td>
                  <td className="text-xs">{m.by}</td>
                  <td className="text-xs" style={{ color: "var(--text-muted)", maxWidth: 200 }}>{m.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Adjustments */}
      {tab === "adjustments" && (
        <div className="card" style={{ padding: 24, maxWidth: 600 }}>
          <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 15, marginBottom: 18 }}>Stock Adjustment</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="input-group" style={{ gridColumn: "1/-1" }}>
              <label className="input-label">Select Product</label>
              <select className="select">{PRODUCTS.map(p => <option key={p.id}>{p.name}</option>)}</select>
            </div>
            <div className="input-group">
              <label className="input-label">Adjustment Type</label>
              <select className="select">
                <option>Add Stock</option><option>Remove Stock</option><option>Set Exact Quantity</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Quantity</label>
              <input className="input" type="number" placeholder="0" min="1" />
            </div>
            <div className="input-group">
              <label className="input-label">Reason</label>
              <select className="select">
                <option>New Delivery</option><option>Damaged Goods</option>
                <option>Inventory Count</option><option>Returned Items</option><option>Other</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Reference / Notes</label>
              <input className="input" placeholder="Optional reference" />
            </div>
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
            <button className="btn btn-accent">Confirm Adjustment</button>
            <button className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal-box" style={{ width: 700 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add New Product</div>
              <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setShowAdd(false)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              {[
                { title: "Basic Information", fields: [
                  { label:"Product Name", col:"1/-1" },
                  { label:"Brand" }, { label:"Category", type:"select", options: cats.filter(c=>c!=="All") },
                  { label:"SKU" }, { label:"Barcode" },
                ]},
                { title: "Pricing", fields: [
                  { label:"Cost Price (KES)", type:"number" },
                  { label:"Selling Price (KES)", type:"number" },
                  { label:"Tax Rate (%)", type:"number" },
                ]},
                { title: "Inventory", fields: [
                  { label:"Opening Stock", type:"number" },
                  { label:"Minimum Stock", type:"number" },
                  { label:"Stock Location" },
                ]},
                { title: "Supplier", fields: [
                  { label:"Supplier", type:"select", options: ["TechSupply Ltd","Appliance World","AudioZone","Office Gear Co"], col:"1/2" },
                ]},
              ].map(section => (
                <div key={section.title} style={{ marginBottom: 20 }}>
                  <div className="section-title">{section.title}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    {section.fields.map(f => (
                      <div key={f.label} style={{ gridColumn: (f as any).col || "auto" }}>
                        <label className="input-label" style={{ display: "block", marginBottom: 5 }}>{f.label}</label>
                        {f.type === "select" ? (
                          <select className="select">
                            {((f as any).options || []).map((o: string) => <option key={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input className="input" type={f.type || "text"} placeholder={`Enter ${f.label.toLowerCase()}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-secondary">Save Draft</button>
              <button className="btn btn-accent">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
