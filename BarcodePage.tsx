import { useState } from "react";
import { Scan, Search, Package, Plus, RefreshCw, ShoppingCart, Eye } from "lucide-react";
import { PRODUCTS, formatCurrency } from "../data/mockData";
import type { AppState } from "../App";

interface Props { ctx: AppState; }

export default function BarcodePage({ ctx }: Props) {
  const [input, setInput] = useState("");
  const [found, setFound] = useState<typeof PRODUCTS[0] | null | "not_found">(null);
  const [recentScans, setRecentScans] = useState<typeof PRODUCTS[0][]>([]);
  const [scanning, setScanning] = useState(false);

  const scan = (barcode: string) => {
    if (!barcode.trim()) return;
    const product = PRODUCTS.find(p => p.barcode === barcode.trim() || p.sku === barcode.trim());
    if (product) {
      setFound(product);
      setRecentScans(prev => [product, ...prev.filter(p => p.id !== product.id)].slice(0, 5));
    } else {
      setFound("not_found");
    }
  };

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      setInput(randomProduct.barcode);
      setFound(randomProduct);
      setRecentScans(prev => [randomProduct, ...prev.filter(p => p.id !== randomProduct.id)].slice(0, 5));
      setScanning(false);
    }, 1200);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Barcode Scanner</div>
          <div className="page-subtitle">Scan product barcodes to look up inventory and add to sales</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        {/* Main scanner */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Camera area */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{
              height: 280, background: "#0f2744", borderRadius: 6,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden", marginBottom: 16
            }}>
              {/* Scan frame */}
              <div style={{
                width: 200, height: 130, border: "2px solid rgba(255,255,255,0.5)",
                borderRadius: 4, position: "relative"
              }}>
                {[
                  { top: -2, left: -2 }, { top: -2, right: -2 },
                  { bottom: -2, left: -2 }, { bottom: -2, right: -2 }
                ].map((pos, i) => (
                  <div key={i} style={{
                    position: "absolute", width: 20, height: 20,
                    border: "3px solid #60a5fa",
                    ...pos,
                    borderTopWidth: pos.bottom !== undefined ? 0 : 3,
                    borderBottomWidth: pos.top !== undefined ? 0 : 3,
                    borderLeftWidth: pos.right !== undefined ? 0 : 3,
                    borderRightWidth: pos.left !== undefined ? 0 : 3,
                  }} />
                ))}
                {scanning && (
                  <div style={{
                    position: "absolute", left: 0, right: 0, height: 2,
                    background: "#60a5fa", boxShadow: "0 0 6px #60a5fa",
                    animation: "scanLine 0.8s ease-in-out infinite alternate",
                    top: "50%"
                  }} />
                )}
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 16, textAlign: "center" }}>
                {scanning ? "Scanning..." : "Point camera at barcode"}
              </div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 4 }}>
                Supports USB, Bluetooth, and mobile scanners
              </div>
              <Scan size={18} color="rgba(255,255,255,0.2)" style={{ position: "absolute", top: 12, right: 12 }} />
              <style>{`
                @keyframes scanLine {
                  from { top: 10%; }
                  to { top: 85%; }
                }
              `}</style>
            </div>

            {/* Manual input */}
            <div style={{ display: "flex", gap: 10 }}>
              <div className="search-wrap" style={{ flex: 1 }}>
                <Search size={15} className="search-icon" />
                <input
                  className="input"
                  placeholder="Enter barcode, SKU, or product name manually..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && scan(input)}
                  style={{ fontFamily: "JetBrains Mono", fontSize: 13 }}
                />
              </div>
              <button className="btn btn-primary" onClick={() => scan(input)}>
                <Scan size={14} /> Scan
              </button>
              <button className="btn btn-secondary" onClick={simulateScan} title="Simulate scan">
                <RefreshCw size={14} style={{ animation: scanning ? "spin 1s linear infinite" : "none" }} />
                Demo
              </button>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#64748b" }}>
              Try barcodes: <span style={{ fontFamily: "JetBrains Mono", cursor: "pointer", color: "#2563eb" }}
                onClick={() => { setInput("8801643121396"); scan("8801643121396"); }}>
                8801643121396
              </span> {" "} or SKU: {" "}
              <span style={{ fontFamily: "JetBrains Mono", cursor: "pointer", color: "#2563eb" }}
                onClick={() => { setInput("HP-ELT-840-G10"); scan("HP-ELT-840-G10"); }}>
                HP-ELT-840-G10
              </span>
            </div>
          </div>

          {/* Result */}
          {found === "not_found" && (
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <Package size={36} color="#d1d5db" style={{ margin: "0 auto 12px" }} />
              <div style={{ fontFamily: "Outfit", fontSize: 16, fontWeight: 600, color: "#1a1f2e", marginBottom: 6 }}>
                Product Not Found
              </div>
              <div style={{ fontSize: 13.5, color: "#64748b", marginBottom: 16 }}>
                The scanned barcode "{input}" does not match any product in the system.
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button className="btn btn-accent" onClick={() => ctx.setPage("inventory")}>
                  <Plus size={14} /> Add New Product
                </button>
                <button className="btn btn-secondary" onClick={() => { setFound(null); setInput(""); }}>
                  <RefreshCw size={14} /> Try Again
                </button>
              </div>
            </div>
          )}

          {found && found !== "not_found" && (
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "12px 18px", background: "#f0f9ff", borderBottom: "1px solid #bae6fd", display: "flex", alignItems: "center", gap: 8 }}>
                <Scan size={15} color="#0369a1" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0369a1" }}>Product Found</span>
              </div>
              <div style={{ padding: 20, display: "flex", gap: 20 }}>
                <div style={{
                  width: 100, height: 100, background: "#f4f5f7", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Package size={36} color="#9faab8" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Outfit", fontSize: 17, fontWeight: 700, color: "#1a1f2e", marginBottom: 4 }}>{found.name}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    {[
                      { label: "SKU", value: found.sku, mono: true },
                      { label: "Barcode", value: found.barcode, mono: true },
                      { label: "Category", value: found.category },
                      { label: "Brand", value: found.brand },
                      { label: "Selling Price", value: formatCurrency(found.sellingPrice), mono: true, highlight: true },
                      { label: "Stock Available", value: `${found.stock} units`, highlight: found.stock === 0 },
                    ].map(r => (
                      <div key={r.label}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>{r.label}</div>
                        <div style={{
                          fontFamily: r.mono ? "JetBrains Mono" : "inherit",
                          fontSize: r.highlight && r.label === "Selling Price" ? 15 : 13.5,
                          fontWeight: r.highlight ? 700 : 500,
                          color: r.label === "Stock Available" && found.stock === 0 ? "#b91c1c"
                            : r.label === "Selling Price" ? "#1a3557" : "#1a1f2e"
                        }}>
                          {r.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-accent btn-sm" onClick={() => ctx.setPage("pos")}>
                      <ShoppingCart size={13} /> Add to Sale
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => ctx.setPage("inventory")}>
                      <Eye size={13} /> View Product
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => ctx.setPage("inventory")}>
                      <Plus size={13} /> Update Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent scans */}
        <div>
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #eef0f4" }}>
              <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 13.5 }}>Recent Scans</span>
            </div>
            {recentScans.length === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: "#9faab8" }}>
                <Scan size={24} style={{ margin: "0 auto 8px", opacity: 0.4 }} />
                <div style={{ fontSize: 12.5 }}>No recent scans</div>
              </div>
            ) : recentScans.map(p => (
              <div key={p.id} style={{
                padding: "10px 14px", borderBottom: "1px solid #f4f5f7",
                cursor: "pointer"
              }}
                onClick={() => setFound(p)}
              >
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1f2e", marginBottom: 3 }}>
                  {p.name.length > 28 ? p.name.slice(0, 28) + "…" : p.name}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#64748b" }}>{p.sku}</span>
                  <span className={`badge ${p.status === "in_stock" ? "badge-success" : p.status === "low_stock" ? "badge-warning" : "badge-danger"}`} style={{ fontSize: 10 }}>
                    {p.stock} left
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 16, marginTop: 14 }}>
            <div style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Scanner Settings</div>
            {[
              { label: "USB Barcode Scanner", status: "Connected" },
              { label: "Bluetooth Scanner", status: "Not connected" },
              { label: "Camera Scanner", status: "Available" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12.5, color: "#374151" }}>{s.label}</span>
                <span className={`badge ${s.status === "Connected" ? "badge-success" : s.status === "Available" ? "badge-info" : "badge-neutral"}`} style={{ fontSize: 10.5 }}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
