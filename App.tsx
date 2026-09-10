import { useState } from "react";
import { ShieldAlert, Lock, Crown } from "lucide-react";
import { USERS, ROLE_PERMISSIONS, type User } from "./data/mockData";
import { loadSubscription, saveSubscription, type SubscriptionState } from "./data/subscription";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import POSPage from "./pages/POSPage";
import InventoryPage from "./pages/InventoryPage";
import WorkersPage from "./pages/WorkersPage";
import FinancePage from "./pages/FinancePage";
import CustomersPage from "./pages/CustomersPage";
import SuppliersPage from "./pages/SuppliersPage";
import BranchesPage from "./pages/BranchesPage";
import ReportsPage from "./pages/ReportsPage";
import RolesPage from "./pages/RolesPage";
import SettingsPage from "./pages/SettingsPage";
import BarcodePage from "./pages/BarcodePage";
import ProfilePage from "./pages/ProfilePage";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import BillingPage from "./pages/BillingPage";

export type Page =
  | "dashboard" | "pos" | "inventory" | "products" | "barcode"
  | "customers" | "suppliers" | "workers" | "roles" | "finance"
  | "income" | "expenses" | "ledger" | "profit_loss" | "balance_sheet"
  | "reports" | "branches" | "profile" | "settings" | "business_profile" | "billing";

export interface AppState {
  user: User;
  permissions: string[];
  currentPage: Page;
  setPage: (page: Page) => void;
  logout: () => void;
  subscription: SubscriptionState;
  setSubscription: (s: SubscriptionState) => void;
}

// Every protected page maps to the permission required to view it.
// Pages omitted here (dashboard, profile) are available to any authenticated user.
// This is enforced at render time below, independent of what the sidebar shows,
// so a page can never be reached just by changing `currentPage` in application state.
const PAGE_PERMISSIONS: Partial<Record<Page, string>> = {
  pos: "create_sale",
  inventory: "view_inventory",
  products: "view_inventory",
  barcode: "view_inventory",
  customers: "view_customers",
  suppliers: "view_suppliers",
  workers: "view_workers",
  roles: "manage_roles",
  finance: "view_income",
  income: "view_income",
  expenses: "view_expenses",
  ledger: "view_ledger",
  profit_loss: "view_profit_loss",
  balance_sheet: "view_balance_sheet",
  reports: "view_reports",
  branches: "view_branches",
  settings: "view_settings",
  business_profile: "manage_settings",
  billing: "manage_settings",
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [subscription, setSubscriptionState] = useState<SubscriptionState>(() => loadSubscription());

  const setSubscription = (s: SubscriptionState) => {
    setSubscriptionState(s);
    saveSubscription(s);
  };

  const login = (email: string, password: string): string | null => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (!found) return "Invalid email or password. Please check your credentials.";
    if (found.status === "inactive") return "This account has been disabled. Contact your administrator.";
    setUser(found);
    setCurrentPage("dashboard");
    return null;
  };

  const logout = () => { setUser(null); setCurrentPage("dashboard"); };

  if (!user) return <LoginPage onLogin={login} />;

  const permissions = ROLE_PERMISSIONS[user.role];

  const ctx: AppState = { user, permissions, currentPage, setPage: setCurrentPage, logout, subscription, setSubscription };

  const requiredPerm = PAGE_PERMISSIONS[currentPage];
  const isAuthorized = !requiredPerm || permissions.includes(requiredPerm);

  // Once the free trial lapses, the whole workspace is locked behind the
  // paywall except for the Billing page (to upgrade) and the user's own
  // Profile. Only the Business Owner can actually purchase a plan.
  const trialExpired =
    subscription.status === "trial" && new Date(subscription.trialEndsOn) < new Date();
  const PAYWALL_EXEMPT: Page[] = ["billing", "profile"];
  const isLocked = trialExpired && !PAYWALL_EXEMPT.includes(currentPage);

  const renderPage = () => {
    if (isLocked) {
      return (
        <TrialExpired
          isOwner={user.role === "owner"}
          onUpgrade={() => setCurrentPage("billing")}
        />
      );
    }
    if (!isAuthorized) return <AccessRestricted onBack={() => setCurrentPage("dashboard")} />;

    switch (currentPage) {
      case "dashboard":        return <Dashboard ctx={ctx} />;
      case "pos":              return <POSPage ctx={ctx} />;
      case "inventory":
      case "products":         return <InventoryPage ctx={ctx} />;
      case "barcode":          return <BarcodePage ctx={ctx} />;
      case "workers":          return <WorkersPage ctx={ctx} />;
      case "roles":            return <RolesPage ctx={ctx} />;
      case "finance":
      case "income":
      case "expenses":
      case "ledger":
      case "profit_loss":
      case "balance_sheet":    return <FinancePage ctx={ctx} tab={currentPage} />;
      case "customers":        return <CustomersPage ctx={ctx} />;
      case "suppliers":        return <SuppliersPage ctx={ctx} />;
      case "branches":         return <BranchesPage ctx={ctx} />;
      case "reports":          return <ReportsPage ctx={ctx} />;
      case "profile":          return <ProfilePage ctx={ctx} />;
      case "settings":         return <SettingsPage ctx={ctx} />;
      case "business_profile": return <BusinessProfilePage ctx={ctx} />;
      case "billing":          return <BillingPage ctx={ctx} />;
      default:                 return <Dashboard ctx={ctx} />;
    }
  };

  return <Layout ctx={ctx}>{renderPage()}</Layout>;
}

function TrialExpired({ isOwner, onUpgrade }: { isOwner: boolean; onUpgrade: () => void }) {
  return (
    <div className="empty-state" style={{ minHeight: "60vh" }}>
      <div className="empty-state-icon" style={{ background: "var(--navy-50)", color: "var(--navy-800)" }}>
        <Lock size={26} />
      </div>
      <div className="empty-state-title">Your free trial has ended</div>
      <div className="empty-state-desc">
        {isOwner
          ? "Choose a plan to keep using BizLedger — KES 500/month, or KES 5,000 once for lifetime access."
          : "Your business owner needs to renew the BizLedger subscription to restore full access for your account."}
      </div>
      {isOwner && (
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={onUpgrade}>
          <Crown size={14} style={{ marginRight: 6 }} />View plans
        </button>
      )}
    </div>
  );
}

function AccessRestricted({ onBack }: { onBack: () => void }) {
  return (
    <div className="empty-state" style={{ minHeight: "60vh" }}>
      <div className="empty-state-icon" style={{ background: "var(--danger-50)", color: "var(--danger-600)" }}>
        <ShieldAlert size={26} />
      </div>
      <div className="empty-state-title">Access Restricted</div>
      <div className="empty-state-desc">
        Your role doesn't have permission to view this page. If you believe this is a mistake,
        contact your business owner or administrator.
      </div>
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={onBack}>
        Back to Dashboard
      </button>
    </div>
  );
}
