import { useState } from "react";
import {
  Search, Scan, Plus, Minus, Trash2, ShoppingCart,
  CreditCard, Smartphone, Banknote, Building2, Package,
  Printer, Download, RefreshCw, Check, X, User
} from "lucide-react";
import { PRODUCTS, CUSTOMERS, formatCurrency } from "../data/mockData";
import type { AppState } from "../App";

interface CartItem { product: typeof PRODUCTS[0]; qty: number; discount: number; }
type Stage = "pos" | "checkout" | "receipt";
type PayMethod = "Cash" | "Mobile Money" | "Card" | "Bank Transfer";

interface Props { ctx: AppState; }

const PAY_ICONS: Record<PayMethod, React.ReactNode> = {
  "Cash":          <Banknote size={16} />,
  "Mobile Money":  <Smartphone size={16} />,
  "Card":          <CreditCard size={16} />,
  "Bank Transfer": <Building2 size={16} />,
};

export default function POSPage({ ctx }: Props) {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart]         = useState<CartItem[]>([]);
  const [stage, setStage]       = useState<Stage>("pos");
  const [payMethod, setPayMethod] = useState<PayMethod>("Cash");
  const [received, setReceived] = useState("");
  const [customer, setCustomer] = useState<typeof CUSTOMERS[0] | null>(null);

  const cats = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filtered = PRODUCTS.filter(p => {
    const q = search.toLowerCase();
    return (category === "All" || p.category === category)
      && (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  });

  const addToCart = (p: typeof PRODUCTS[0]) => {
    if (!p.stock) return;
    setCart(prev => {
      const ex = prev.find(c => c.product.id === p.id);
      if (ex) return ex.qty >= p.stock ? prev : prev.map(c => c.product.id===p.id ? {...c,qty:c.qty+1} : c);
      return [...prev, { product: p, qty: 1, discount: 0 }];
    });
  };

  const updateQty = (id: string, d: number) =>
    setCart(prev => prev.map(c => c.product.id!==id ? c
      : {...c, qty: Math.max(1, Math.min(c.product.stock, c.qty+d))}));

  const remove = (id: string) => setCart(prev => prev.filter(c => c.product.id !== id));

  const subtotal = cart.reduce((s,c) => s + c.product.sellingPrice * c.qty * (1 - c.discount/100), 0);
  const tax      = subtotal * 0.16;
  const total    = subtotal + tax;
  const change   = parseFloat(received || "0") - total;
  const txId     = "TXN-2024-" + String(Math.floor(Math.random()*900)+800).padStart(4,"0");

  const resetSale = () => { setCart([]); setStage("pos"); setReceived(""); setCustomer(null); };

  /* Receipt */
  if (stage === "receipt") return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ background: "var(--navy-800)", padding: "24px 28px", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <Check size={26} color="#4ade80" />
          </div>
          <div style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 4 }}>Payment Successful</div>
          <div style={{ fontSize: 13, color: "rgba(180,205,228,0.7)" }}>Transaction completed</div>
        </div>
        <div style={{ padding: "22px 28px" }}>
          <div style={{ background: "var(--gray-50)", border: "1px dashed var(--border)", borderRadius: "var(--radius)", padding: 18, marginBottom: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 0" }}>
              {[
                ["Transaction ID", txId],
                ["Date & Time", new Date().toLocaleString("en-KE")],
                ["Customer", customer?.name || "Walk-in Customer"],
                ["Payment Method", payMethod],
              ].map(([l,v]) => (
                <div key={l} style={{ display: "contents" }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{l}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, textAlign: "right",
                    fontFamily: l === "Transaction ID" ? "JetBrains Mono" : "inherit",
                    color: l === "Transaction ID" ? "var(--accent-600)" : "var(--text-primary)"
                  }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px dashed var(--border)", margin: "12px 0" }} />
            {cart.map(c => (
              <div key={c.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                <span>{c.product.name.slice(0,36)}{c.product.name.length>36?"…":""} × {c.qty}</span>
                <span className="mono">{formatCurrency(c.product.sellingPrice * c.qty)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 10, paddingTop: 10 }}>
              {[
                ["Subtotal", formatCurrency(subtotal)],
                ["VAT (16%)", formatCurrency(tax)],
              ].map(([l,v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-muted)", marginBottom: 5 }}>
                  <span>{l}</span><span className="mono">{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, marginTop: 8 }}>
                <span>Total Paid</span>
                <span className="mono" style={{ color: "var(--navy-800)" }}>{formatCurrency(total)}</span>
              </div>
              {payMethod === "Cash" && change >= 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600, color: "var(--success-700)", marginTop: 6 }}>
                  <span>Change Given</span>
                  <span className="mono">{formatCurrency(change)}</span>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button className="btn btn-secondary"><Printer size={14} /> Print Receipt</button>
            <button className="btn btn-secondary"><Download size={14} /> Download</button>
            <button className="btn btn-accent" onClick={resetSale}><RefreshCw size={14} /> New Sale</button>
          </div>
        </div>
      </div>
    </div>
  );

  /* Checkout */
  if (stage === "checkout") return (
    <div style={{ maxWidth: 660, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setStage("pos")}><X size={16} /></button>
        <div className="page-title">Checkout</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Order summary */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="card-header"><div className="card-title">Order Summary</div></div>
          <div style={{ padding: "8px 0" }}>
            {cart.map(c => (
              <div key={c.product.id} style={{ padding: "8px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)" }}>
                <span className="text-sm">{c.product.name.slice(0,42)}{c.product.name.length>42?"…":""} <span style={{ color: "var(--text-muted)" }}>× {c.qty}</span></span>
                <span className="mono text-sm" style={{ fontWeight: 600 }}>{formatCurrency(c.product.sellingPrice * c.qty)}</span>
              </div>
            ))}
            <div style={{ padding: "12px 16px" }}>
              {[["Subtotal", formatCurrency(subtotal)],["VAT (16%)", formatCurrency(tax)]].map(([l,v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-muted)", marginBottom: 5 }}>
                  <span>{l}</span><span className="mono">{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 700, marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border-light)" }}>
                <span>Total</span>
                <span className="mono" style={{ color: "var(--navy-800)" }}>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer */}
        <div className="card" style={{ padding: 16 }}>
          <div className="card-title" style={{ marginBottom: 10 }}>Customer</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <User size={14} color="var(--text-muted)" />
            <select className="select" style={{ flex: 1 }} value={customer?.id || ""}
              onChange={e => setCustomer(CUSTOMERS.find(c => c.id===e.target.value)||null)}>
              <option value="">Walk-in Customer</option>
              {CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Payment method */}
        <div className="card" style={{ padding: 16 }}>
          <div className="card-title" style={{ marginBottom: 12 }}>Payment Method</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: payMethod === "Cash" ? 14 : 0 }}>
            {(Object.keys(PAY_ICONS) as PayMethod[]).map(m => (
              <button key={m} onClick={() => setPayMethod(m)}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "10px 14px",
                  border: `1.5px solid ${payMethod===m ? "var(--accent-600)" : "var(--border)"}`,
                  borderRadius: "var(--radius)", background: payMethod===m ? "var(--accent-50)" : "white",
                  cursor: "pointer", fontSize: 13.5, fontWeight: payMethod===m ? 600 : 400,
                  color: payMethod===m ? "var(--accent-700)" : "var(--text-secondary)"
                }}>
                {PAY_ICONS[m]}{m}
              </button>
            ))}
          </div>
          {payMethod === "Cash" && (
            <div>
              <label className="input-label" style={{ display: "block", marginBottom: 6 }}>Amount Received (KES)</label>
              <input className="input" type="number" placeholder="0.00" value={received} onChange={e => setReceived(e.target.value)} style={{ fontFamily: "JetBrains Mono", fontSize: 16 }} />
              {parseFloat(received||"0") >= total && (
                <div style={{ marginTop: 10, background: "var(--success-50)", border: "1px solid #bbf7d0", borderRadius: "var(--radius)", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--success-700)" }}>Change</span>
                  <span className="mono" style={{ fontSize: 18, fontWeight: 800, color: "var(--success-700)" }}>{formatCurrency(change)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStage("pos")}>Back</button>
          <button className="btn btn-accent btn-lg" style={{ flex: 2, justifyContent: "center" }}
            disabled={payMethod==="Cash" && parseFloat(received||"0") < total}
            onClick={() => setStage("receipt")}>
            <Check size={16} /> Confirm — {formatCurrency(total)}
          </button>
        </div>
      </div>
    </div>
  );

  /* POS main */
  return (
    <div className="pos-layout">
      {/* Products area */}
      <div className="pos-products">
        {/* Search + categories */}
        <div style={{ display: "flex", gap: 10 }}>
          <div className="search-input-wrap" style={{ flex: 1 }}>
            <Search size={14} className="search-icon-abs" />
            <input className="input" placeholder="Search products, SKU, or barcode…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => ctx.setPage("barcode")}>
            <Scan size={14} /> Scan
          </button>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`btn btn-xs ${category===c ? "btn-primary" : "btn-secondary"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(188px,1fr))", gap: 10 }}>
          {filtered.map(p => (
            <div key={p.id} className={`product-card ${!p.stock ? "out" : ""}`} onClick={() => addToCart(p)}>
              <div style={{
                height: 72, background: "var(--gray-100)", borderRadius: "var(--radius)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10
              }}>
                <Package size={28} color="var(--gray-300)" />
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 3, lineHeight: 1.3, color: "var(--text-primary)" }}>
                {p.name.length > 42 ? p.name.slice(0,42)+"…" : p.name}
              </div>
              <div className="mono text-2xs" style={{ color: "var(--text-subtle)", marginBottom: 8 }}>{p.sku}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--navy-800)" }}>
                  {formatCurrency(p.sellingPrice)}
                </span>
                <span className={`badge ${p.status==="in_stock"?"badge-success":p.status==="low_stock"?"badge-warning":"badge-danger"}`} style={{ fontSize: 10.5 }}>
                  {!p.stock ? "Out" : `${p.stock}`}
                </span>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <div style={{ gridColumn: "1/-1" }}>
              <div className="empty-state">
                <div className="empty-state-icon"><Package size={24} /></div>
                <div className="empty-state-title">No products found</div>
                <div className="empty-state-desc">Try a different search term or category</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cart */}
      <div className="pos-cart">
        {/* Cart header */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
          <ShoppingCart size={16} color="var(--navy-800)" />
          <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 14 }}>Current Sale</span>
          {cart.length > 0 && (
            <span className="badge badge-navy" style={{ marginLeft: "auto", fontSize: 11 }}>
              {cart.reduce((s,c)=>s+c.qty,0)} items
            </span>
          )}
        </div>

        {/* Customer selector */}
        <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-light)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <User size={13} color="var(--text-subtle)" />
            <select className="select" style={{ flex: 1, fontSize: 12.5, padding: "4px 28px 4px 8px", height: 30 }}
              value={customer?.id || ""}
              onChange={e => setCustomer(CUSTOMERS.find(c=>c.id===e.target.value)||null)}>
              <option value="">Walk-in Customer</option>
              {CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {!cart.length ? (
            <div className="empty-state" style={{ padding: "40px 20px" }}>
              <div className="empty-state-icon"><ShoppingCart size={22} /></div>
              <div className="empty-state-title" style={{ fontSize: 14 }}>Cart is empty</div>
              <div className="empty-state-desc" style={{ fontSize: 12 }}>Click a product to add it to the sale</div>
            </div>
          ) : cart.map(c => (
            <div key={c.product.id} style={{ padding: "10px 12px", borderBottom: "1px solid var(--border-light)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, flex: 1, paddingRight: 8, lineHeight: 1.3 }}>
                  {c.product.name.length>32 ? c.product.name.slice(0,32)+"…" : c.product.name}
                </span>
                <button onClick={() => remove(c.product.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger-600)", padding: 2, borderRadius: 3 }}>
                  <Trash2 size={13} />
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {[
                    { icon: <Minus size={11} />, action: () => updateQty(c.product.id, -1) },
                    { value: c.qty },
                    { icon: <Plus size={11} />,  action: () => updateQty(c.product.id, 1) },
                  ].map((el,i) => el.value !== undefined
                    ? <span key={i} className="mono" style={{ fontSize: 14, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{el.value}</span>
                    : <button key={i} onClick={el.action}
                        style={{ width: 22, height: 22, borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {el.icon}
                      </button>
                  )}
                </div>
                <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--navy-800)" }}>
                  {formatCurrency(c.product.sellingPrice * c.qty)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals + Checkout */}
        {cart.length > 0 && (
          <div style={{ borderTop: "1px solid var(--border)", padding: "12px 14px" }}>
            {[["Subtotal", formatCurrency(subtotal)],["VAT (16%)", formatCurrency(tax)]].map(([l,v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--text-muted)", marginBottom: 4 }}>
                <span>{l}</span><span className="mono">{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, marginTop: 8, marginBottom: 12 }}>
              <span>Total</span>
              <span className="mono" style={{ color: "var(--navy-800)" }}>{formatCurrency(total)}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: "center" }} onClick={resetSale}>
                <Trash2 size={12} /> Clear
              </button>
              <button className="btn btn-accent" style={{ flex: 2, justifyContent: "center" }} onClick={() => setStage("checkout")}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
