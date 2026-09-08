import { useState } from "react";
import {
  CreditCard, Check, Crown, Calendar, ShieldCheck,
  Loader2, Download, Sparkles,
} from "lucide-react";
import type { AppState } from "../App";
import { PLANS, formatKES, purchasePlan, type PlanId } from "../data/subscription";

interface Props { ctx: AppState; }

export default function BillingPage({ ctx }: Props) {
  const { subscription, setSubscription, user } = ctx;
  const [checkoutPlan, setCheckoutPlan] = useState<PlanId | null>(null);
  const [processing, setProcessing] = useState(false);
  const [justPurchased, setJustPurchased] = useState<PlanId | null>(null);
  const [form, setForm] = useState({ name: user.name, number: "", expiry: "", cvv: "" });

  const isOwner = user.role === "owner";
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(subscription.trialEndsOn).getTime() - Date.now()) / 86400000)
  );

  const submitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutPlan) return;
    setProcessing(true);
    // Simulated payment processing — no real charge occurs.
    setTimeout(() => {
      setSubscription(purchasePlan(checkoutPlan as "monthly" | "lifetime", subscription));
      setProcessing(false);
      setJustPurchased(checkoutPlan);
      setCheckoutPlan(null);
      setForm({ name: user.name, number: "", expiry: "", cvv: "" });
    }, 900);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Billing &amp; Subscription</div>
          <div className="page-subtitle">Manage your BizLedger platform plan and view billing history.</div>
        </div>
      </div>

      {justPurchased && (
        <div className="card" style={{
          marginBottom: 16, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
          background: "var(--success-50)", borderColor: "var(--success-100)",
        }}>
          <Check size={16} color="var(--success-700)" />
          <div style={{ fontSize: 13, color: "var(--success-800)" }}>
            {justPurchased === "lifetime"
              ? "You're all set — lifetime access is active. No further payments, ever."
              : "You're subscribed. Your monthly plan is now active."}
          </div>
        </div>
      )}

      {!isOwner && (
        <div className="card" style={{ marginBottom: 16, padding: "12px 16px", fontSize: 13, color: "var(--text-muted)" }}>
          Only the Business Owner can change the subscription plan. You can view current status below.
        </div>
      )}

      {/* Current plan status */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "var(--radius-lg)", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: subscription.status === "lifetime" ? "var(--navy-900)" : subscription.status === "active" ? "var(--accent-600)" : "var(--gray-100)",
              color: subscription.status === "trial" ? "var(--gray-500)" : "white",
            }}>
              {subscription.status === "lifetime" ? <Crown size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 16 }}>
                {subscription.status === "lifetime" && "Lifetime Plan"}
                {subscription.status === "active" && "Monthly Plan"}
                {subscription.status === "trial" && "Free Trial"}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>
                {subscription.status === "lifetime" && "Full access forever. Thank you for being a BizLedger customer."}
                {subscription.status === "active" && subscription.renewsOn && `Renews on ${subscription.renewsOn}`}
                {subscription.status === "trial" && (daysLeft > 0
                  ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left in your trial`
                  : "Your trial has ended — upgrade to keep full access")}
              </div>
            </div>
          </div>
          <span className={`badge ${
            subscription.status === "lifetime" ? "badge-navy" : subscription.status === "active" ? "badge-success" : "badge-warning"
          }`}>
            {subscription.status === "lifetime" ? "Lifetime" : subscription.status === "active" ? "Active" : "Trial"}
          </span>
        </div>
      </div>

      {/* Pricing plans */}
      {subscription.status !== "lifetime" && (
        <>
          <div className="section-title" style={{ border: "none", padding: 0, marginBottom: 14 }}>
            Choose a plan
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(260px, 1fr))", gap: 16, marginBottom: 24 }}>
            {PLANS.map(plan => {
              const isCurrent = subscription.status === "active" && plan.id === "monthly";
              return (
                <div key={plan.id} className="card" style={{
                  padding: 24, position: "relative",
                  borderColor: plan.highlight ? "var(--navy-800)" : "var(--border)",
                  borderWidth: plan.highlight ? 2 : 1,
                }}>
                  {plan.badge && (
                    <span className="badge badge-navy" style={{ position: "absolute", top: -10, left: 22 }}>
                      <Sparkles size={11} style={{ marginRight: 4 }} />{plan.badge}
                    </span>
                  )}
                  <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 17 }}>{plan.name}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, minHeight: 34 }}>{plan.tagline}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "16px 0 18px" }}>
                    <span style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 32 }}>{formatKES(plan.price)}</span>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{plan.billingLabel}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13 }}>
                        <Check size={14} color="var(--success-600)" style={{ marginTop: 2, flexShrink: 0 }} />
                        <span style={{ color: "var(--text-secondary)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={plan.highlight ? "btn btn-primary" : "btn btn-secondary"}
                    style={{ width: "100%" }}
                    disabled={!isOwner || isCurrent}
                    onClick={() => setCheckoutPlan(plan.id as PlanId)}
                  >
                    {isCurrent ? "Current plan" : plan.id === "lifetime" ? "Get lifetime access" : "Subscribe monthly"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Billing history */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Billing History</div>
            <div className="card-subtitle">Invoices for your BizLedger platform subscription</div>
          </div>
        </div>
        {subscription.invoices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Calendar size={22} /></div>
            <div className="empty-state-title">No invoices yet</div>
            <div className="empty-state-desc">Your billing history will appear here once you subscribe.</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subscription.invoices.map(inv => (
                <tr key={inv.id}>
                  <td className="mono">{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{inv.description}</td>
                  <td className="mono">{formatKES(inv.amount)}</td>
                  <td><span className="badge badge-success">Paid</span></td>
                  <td>
                    <button className="btn btn-ghost btn-xs" style={{ color: "var(--accent-600)" }}>
                      <Download size={12} style={{ marginRight: 4 }} />Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Checkout modal */}
      {checkoutPlan && (
        <div className="modal-backdrop" onClick={() => !processing && setCheckoutPlan(null)}>
          <div className="modal-box" style={{ width: 420 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                {checkoutPlan === "lifetime" ? "Get lifetime access" : "Subscribe monthly"}
              </div>
            </div>
            <form onSubmit={submitCheckout}>
              <div className="modal-body">
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px", background: "var(--gray-50)", borderRadius: "var(--radius)",
                  marginBottom: 18, fontSize: 13.5,
                }}>
                  <span>{checkoutPlan === "lifetime" ? "Lifetime access (one-time)" : "Monthly subscription"}</span>
                  <span style={{ fontWeight: 700 }}>
                    {formatKES(PLANS.find(p => p.id === checkoutPlan)!.price)}
                    {checkoutPlan === "monthly" && <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="input-group">
                    <label className="input-label">Cardholder name</label>
                    <input className="input" required value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Card number</label>
                    <div className="search-input-wrap">
                      <CreditCard size={14} className="search-icon-abs" />
                      <input className="input" required placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        value={form.number}
                        onChange={e => setForm(f => ({ ...f, number: e.target.value }))} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="input-group">
                      <label className="input-label">Expiry</label>
                      <input className="input" required placeholder="MM/YY" maxLength={5}
                        value={form.expiry}
                        onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} />
                    </div>
                    <div className="input-group">
                      <label className="input-label">CVV</label>
                      <input className="input" required placeholder="123" maxLength={4}
                        value={form.cvv}
                        onChange={e => setForm(f => ({ ...f, cvv: e.target.value }))} />
                    </div>
                  </div>
                </div>
                <div className="input-hint" style={{ marginTop: 14 }}>
                  Demo checkout — no real payment processor is connected and no card is charged.
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" disabled={processing} onClick={() => setCheckoutPlan(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={processing}>
                  {processing
                    ? <><Loader2 size={14} className="spin-anim" style={{ marginRight: 6 }} />Processing…</>
                    : `Pay ${formatKES(PLANS.find(p => p.id === checkoutPlan)!.price)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
