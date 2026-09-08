// Platform subscription (billing for BizLedger itself). Priced in Kenyan
// Shillings, same currency as the business's own ledger data in this app.
// This is mock/local state only — there is no real payment processor wired up.

export type PlanId = "trial" | "monthly" | "lifetime";

export interface Plan {
  id: PlanId;
  name: string;
  price: number; // KES
  billingLabel: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: 500,
    billingLabel: "/ month",
    tagline: "Full platform access, billed monthly. Cancel anytime.",
    features: [
      "Unlimited branches & users",
      "Point of Sale & barcode scanning",
      "Full finance suite (ledger, P&L, balance sheet)",
      "Inventory & supplier management",
      "Reports & data export",
      "Priority email support",
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: 5000,
    billingLabel: "one-time",
    tagline: "Pay once. Full access forever — no renewals, ever.",
    features: [
      "Everything in Monthly, forever",
      "All future feature updates included",
      "No recurring billing",
      "Priority email support",
    ],
    highlight: true,
    badge: "Best value",
  },
];

export interface SubscriptionState {
  planId: PlanId;                 // "trial" until upgraded
  status: "trial" | "active" | "lifetime";
  startedOn: string | null;       // ISO date the paid plan started
  renewsOn: string | null;        // ISO date of next renewal (monthly only)
  trialEndsOn: string;            // ISO date trial expires
  invoices: Invoice[];
}

export interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid";
}

const STORAGE_KEY = "bizledger.subscription";

function defaultSubscription(): SubscriptionState {
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 14);
  return {
    planId: "trial",
    status: "trial",
    startedOn: null,
    renewsOn: null,
    trialEndsOn: trialEnd.toISOString().slice(0, 10),
    invoices: [],
  };
}

export function loadSubscription(): SubscriptionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SubscriptionState;
  } catch {
    // fall through to default
  }
  return defaultSubscription();
}

export function saveSubscription(state: SubscriptionState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write failures (e.g. private browsing)
  }
}

export function purchasePlan(planId: "monthly" | "lifetime", current: SubscriptionState): SubscriptionState {
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);
  const plan = PLANS.find(p => p.id === planId)!;

  const invoice: Invoice = {
    id: `INV-${today.getFullYear()}-${String(current.invoices.length + 1).padStart(4, "0")}`,
    date: todayISO,
    description: planId === "monthly" ? "BizLedger — Monthly Subscription" : "BizLedger — Lifetime Access",
    amount: plan.price,
    status: "paid",
  };

  let renewsOn: string | null = null;
  if (planId === "monthly") {
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    renewsOn = next.toISOString().slice(0, 10);
  }

  return {
    ...current,
    planId,
    status: planId === "lifetime" ? "lifetime" : "active",
    startedOn: current.startedOn ?? todayISO,
    renewsOn,
    invoices: [invoice, ...current.invoices],
  };
}

export const formatKES = (amount: number) => `KES ${amount.toLocaleString("en-KE")}`;
