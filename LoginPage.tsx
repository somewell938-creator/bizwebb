import { useState } from "react";
import { Eye, EyeOff, LayoutDashboard, Shield, AlertCircle, Check } from "lucide-react";
import { DEMO_ACCOUNTS } from "../data/mockData";

interface Props { onLogin: (email: string, password: string) => string | null; }

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const err = onLogin(email, password);
    setLoading(false);
    if (err) setError(err);
  };

  const fillDemo = (em: string, pw: string) => {
    setEmail(em); setPassword(pw); setError("");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Left: Brand panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
        background: "var(--navy-900)", padding: "40px 52px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Subtle grid texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        {/* Accent glow blob */}
        <div style={{
          position: "absolute", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          bottom: -200, left: -100, pointerEvents: "none"
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--accent-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LayoutDashboard size={20} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>BizLedger</div>
            <div style={{ fontSize: 10, color: "rgba(160,185,212,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>Business Management Platform</div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ position: "relative", maxWidth: 480 }}>
          <div style={{
            display: "inline-block", background: "rgba(37,99,235,0.15)",
            border: "1px solid rgba(37,99,235,0.25)",
            borderRadius: 4, padding: "4px 10px", marginBottom: 20,
            fontSize: 11.5, color: "var(--navy-300)", fontWeight: 600, letterSpacing: "0.05em"
          }}>
            ALL-IN-ONE BUSINESS MANAGEMENT
          </div>

          <h1 style={{
            fontFamily: "Outfit", fontSize: 42, fontWeight: 800, color: "white",
            lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.03em"
          }}>
            Manage your business.<br />
            <span style={{ color: "var(--navy-300)" }}>Track every transaction.</span><br />
            Stay in control.
          </h1>

          <p style={{ fontSize: 15, color: "rgba(160,185,212,0.7)", lineHeight: 1.7, marginBottom: 32 }}>
            A complete operating system for your business — sales, inventory, finance, team management, and reporting — all in one secure platform.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Real-time POS with barcode scanning",
              "Role-based access for your entire team",
              "Complete financial ledger and reports",
              "Multi-branch business management",
            ].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(37,99,235,0.25)", border: "1px solid rgba(37,99,235,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={10} color="var(--accent-500)" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 13.5, color: "rgba(180,205,228,0.8)" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom trust badges */}
        <div style={{ display: "flex", gap: 12, position: "relative" }}>
          {[
            { icon: <Shield size={14} />, text: "Bank-grade security" },
            { icon: <LayoutDashboard size={14} />, text: "Multi-branch ready" },
          ].map(b => (
            <div key={b.text} style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 5, padding: "6px 12px", color: "rgba(160,185,212,0.65)", fontSize: 12
            }}>
              {b.icon}<span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Login form */}
      <div style={{
        width: 460, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "40px 44px", background: "white", overflowY: "auto"
      }}>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "Outfit", fontSize: 26, fontWeight: 700, marginBottom: 5 }}>Welcome back</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Sign in to access your BizLedger account.</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 9,
            background: "var(--danger-50)", border: "1px solid #fca5a5",
            borderRadius: "var(--radius)", padding: "10px 14px", marginBottom: 18,
            color: "var(--danger-700)", fontSize: 13.5
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div className="input-group">
            <label className="input-label">Email address or username</label>
            <input className="input" type="text" placeholder="name@company.com"
              value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" />
          </div>

          <div className="input-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="input-label">Password</label>
              <button type="button" style={{ fontSize: 12.5, color: "var(--accent-600)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input className="input" type={showPw ? "text" : "password"} placeholder="Enter your password"
                value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password"
                style={{ paddingRight: 38 }} />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-subtle)", padding: 2 }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" id="rem" checked={remember} onChange={e => setRemember(e.target.checked)}
              style={{ width: 14, height: 14, accentColor: "var(--accent-600)", cursor: "pointer" }} />
            <label htmlFor="rem" style={{ fontSize: 13, color: "var(--text-secondary)", cursor: "pointer" }}>Keep me signed in for 30 days</label>
          </div>

          <button type="submit" className="btn btn-accent btn-xl" disabled={loading}
            style={{ width: "100%", justifyContent: "center", marginTop: 4, fontSize: 15 }}>
            {loading ? (
              <span className="spin-anim" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", display: "inline-block" }} />
            ) : null}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Demo accounts */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--text-subtle)", fontWeight: 500 }}>DEMO ACCOUNTS</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {DEMO_ACCOUNTS.map(acc => (
              <button key={acc.email} onClick={() => fillDemo(acc.email, acc.password)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: email === acc.email ? "var(--accent-50)" : "white",
                  border: `1px solid ${email === acc.email ? "var(--accent-500)" : "var(--border)"}`,
                  borderRadius: "var(--radius)", padding: "8px 12px", cursor: "pointer", textAlign: "left",
                  transition: "all 0.1s"
                }}
                onMouseEnter={e => { if (email !== acc.email) e.currentTarget.style.background = "var(--gray-50)"; }}
                onMouseLeave={e => { if (email !== acc.email) e.currentTarget.style.background = "white"; }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy-800)" }}>{acc.role}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{acc.description}</div>
                </div>
                <div style={{ fontSize: 12, color: "var(--accent-600)", fontWeight: 500, flexShrink: 0 }}>
                  {email === acc.email ? <Check size={14} color="var(--accent-600)" /> : "Select"}
                </div>
              </button>
            ))}
          </div>
          {email && password && (
            <button className="btn btn-accent" style={{ width: "100%", justifyContent: "center", marginTop: 10, fontSize: 13.5 }}
              onClick={handleSubmit as any}>
              Sign in as {DEMO_ACCOUNTS.find(a => a.email === email)?.role || "selected user"}
            </button>
          )}
        </div>

        <p style={{ marginTop: 22, fontSize: 11.5, color: "var(--text-subtle)", textAlign: "center", lineHeight: 1.6 }}>
          Access is determined by your assigned role and permissions.<br />
          By signing in you agree to the BizLedger Terms of Service.
        </p>
      </div>
    </div>
  );
}
