export type Role = "owner" | "admin" | "manager" | "cashier" | "stock_manager" | "worker";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  position: string;
  branch: string;
  avatar: string;
  status: "active" | "inactive";
  lastLogin: string;
  phone: string;
}

export const USERS: User[] = [
  {
    id: "u1", name: "James Okafor", email: "owner@bizledger.com", password: "owner123",
    role: "owner", position: "Business Owner", branch: "All Branches",
    avatar: "JO", status: "active", lastLogin: "2024-01-15 09:23", phone: "+254 712 345 678"
  },
  {
    id: "u2", name: "Sarah Kimani", email: "admin@bizledger.com", password: "admin123",
    role: "admin", position: "Administrator", branch: "Main Branch",
    avatar: "SK", status: "active", lastLogin: "2024-01-15 08:45", phone: "+254 723 456 789"
  },
  {
    id: "u3", name: "David Mwangi", email: "manager@bizledger.com", password: "mgr123",
    role: "manager", position: "Operations Manager", branch: "Westlands Branch",
    avatar: "DM", status: "active", lastLogin: "2024-01-14 17:30", phone: "+254 734 567 890"
  },
  {
    id: "u4", name: "Grace Wanjiku", email: "cashier@bizledger.com", password: "cash123",
    role: "cashier", position: "Cashier", branch: "Main Branch",
    avatar: "GW", status: "active", lastLogin: "2024-01-15 07:55", phone: "+254 745 678 901"
  },
  {
    id: "u5", name: "Peter Njoroge", email: "stock@bizledger.com", password: "stock123",
    role: "stock_manager", position: "Stock Manager", branch: "Industrial Area Branch",
    avatar: "PN", status: "active", lastLogin: "2024-01-15 06:40", phone: "+254 756 789 012"
  },
  {
    id: "u6", name: "Mary Achieng", email: "worker@bizledger.com", password: "work123",
    role: "worker", position: "Sales Associate", branch: "Main Branch",
    avatar: "MA", status: "active", lastLogin: "2024-01-14 18:10", phone: "+254 767 890 123"
  },
];

export const DEMO_ACCOUNTS = [
  { role: "Business Owner", email: "owner@bizledger.com", password: "owner123", description: "Full access to all features" },
  { role: "Admin", email: "admin@bizledger.com", password: "admin123", description: "Operational management access" },
  { role: "Manager", email: "manager@bizledger.com", password: "mgr123", description: "Branch operations access" },
  { role: "Cashier", email: "cashier@bizledger.com", password: "cash123", description: "POS and sales access" },
  { role: "Stock Manager", email: "stock@bizledger.com", password: "stock123", description: "Inventory management access" },
  { role: "Worker", email: "worker@bizledger.com", password: "work123", description: "Limited task-based access" },
];

export const PRODUCTS = [
  { id: "p1", name: "Samsung 55\" 4K Smart TV", sku: "SAM-TV-55-4K", barcode: "8801643121396", category: "Electronics", brand: "Samsung", costPrice: 42000, sellingPrice: 58000, stock: 12, minStock: 5, status: "in_stock", image: null, supplier: "TechSupply Ltd", lastUpdated: "2024-01-14" },
  { id: "p2", name: "HP EliteBook 840 G10 Laptop", sku: "HP-ELT-840-G10", barcode: "8719233746862", category: "Computers", brand: "HP", costPrice: 85000, sellingPrice: 115000, stock: 8, minStock: 3, status: "in_stock", image: null, supplier: "TechSupply Ltd", lastUpdated: "2024-01-13" },
  { id: "p3", name: "LG 8kg Front Load Washer", sku: "LG-WM-8KG-FL", barcode: "6935011816843", category: "Appliances", brand: "LG", costPrice: 28000, sellingPrice: 38500, stock: 3, minStock: 5, status: "low_stock", image: null, supplier: "Appliance World", lastUpdated: "2024-01-12" },
  { id: "p4", name: "Apple AirPods Pro 2nd Gen", sku: "APL-APP-PRO-2", barcode: "0194252957998", category: "Audio", brand: "Apple", costPrice: 18000, sellingPrice: 24500, stock: 0, minStock: 10, status: "out_of_stock", image: null, supplier: "Apple Authorized", lastUpdated: "2024-01-10" },
  { id: "p5", name: "Nikon D3500 DSLR Camera Kit", sku: "NIK-D3500-KIT", barcode: "4960759147370", category: "Cameras", brand: "Nikon", costPrice: 35000, sellingPrice: 48000, stock: 6, minStock: 3, status: "in_stock", image: null, supplier: "Camera House", lastUpdated: "2024-01-14" },
  { id: "p6", name: "Sony 65\" OLED Bravia TV", sku: "SNY-TV-65-OL", barcode: "4548736141612", category: "Electronics", brand: "Sony", costPrice: 78000, sellingPrice: 105000, stock: 4, minStock: 2, status: "in_stock", image: null, supplier: "TechSupply Ltd", lastUpdated: "2024-01-11" },
  { id: "p7", name: "Logitech MX Keys Keyboard", sku: "LOG-MXK-ADV", barcode: "5099206082472", category: "Peripherals", brand: "Logitech", costPrice: 4500, sellingPrice: 6800, stock: 25, minStock: 10, status: "in_stock", image: null, supplier: "TechSupply Ltd", lastUpdated: "2024-01-15" },
  { id: "p8", name: "Canon PIXMA G3430 Printer", sku: "CAN-G3430-INK", barcode: "4549292158700", category: "Printers", brand: "Canon", costPrice: 12000, sellingPrice: 16500, stock: 2, minStock: 5, status: "low_stock", image: null, supplier: "Office Gear Co", lastUpdated: "2024-01-09" },
  { id: "p9", name: "Dell 27\" QHD Monitor", sku: "DEL-S2722QC", barcode: "5397184683640", category: "Monitors", brand: "Dell", costPrice: 22000, sellingPrice: 30000, stock: 9, minStock: 4, status: "in_stock", image: null, supplier: "TechSupply Ltd", lastUpdated: "2024-01-14" },
  { id: "p10", name: "JBL Flip 6 Bluetooth Speaker", sku: "JBL-FLIP6-BLK", barcode: "6925281987380", category: "Audio", brand: "JBL", costPrice: 6500, sellingPrice: 9200, stock: 18, minStock: 8, status: "in_stock", image: null, supplier: "AudioZone", lastUpdated: "2024-01-15" },
  { id: "p11", name: "Epson EcoTank L3250 Printer", sku: "EPS-L3250-ECO", barcode: "8715946695198", category: "Printers", brand: "Epson", costPrice: 9800, sellingPrice: 13500, stock: 1, minStock: 4, status: "low_stock", image: null, supplier: "Office Gear Co", lastUpdated: "2024-01-08" },
  { id: "p12", name: "USB-C Hub 7-in-1 Adapter", sku: "USB-HUB-7IN1", barcode: "0850029521234", category: "Accessories", brand: "Anker", costPrice: 1800, sellingPrice: 2800, stock: 40, minStock: 15, status: "in_stock", image: null, supplier: "Accessories Plus", lastUpdated: "2024-01-15" },
];

export const TRANSACTIONS = [
  { id: "TXN-2024-0847", customer: "Nairobi Tech Hub", paymentMethod: "Bank Transfer", amount: 115000, status: "completed", date: "2024-01-15 11:32", cashier: "Grace Wanjiku", branch: "Main Branch" },
  { id: "TXN-2024-0846", customer: "Walk-in Customer", paymentMethod: "Cash", amount: 24500, status: "completed", date: "2024-01-15 10:58", cashier: "Grace Wanjiku", branch: "Main Branch" },
  { id: "TXN-2024-0845", customer: "Equity Bank Ltd", paymentMethod: "Card", amount: 58000, status: "completed", date: "2024-01-15 10:14", cashier: "Grace Wanjiku", branch: "Main Branch" },
  { id: "TXN-2024-0844", customer: "Mwangi Traders", paymentMethod: "Mobile Money", amount: 9200, status: "completed", date: "2024-01-15 09:45", cashier: "Mary Achieng", branch: "Westlands Branch" },
  { id: "TXN-2024-0843", customer: "ABC Enterprises", paymentMethod: "Mobile Money", amount: 38500, status: "pending", date: "2024-01-15 09:20", cashier: "Grace Wanjiku", branch: "Main Branch" },
  { id: "TXN-2024-0842", customer: "Walk-in Customer", paymentMethod: "Cash", amount: 6800, status: "completed", date: "2024-01-15 08:55", cashier: "Mary Achieng", branch: "Westlands Branch" },
  { id: "TXN-2024-0841", customer: "Kenya Power Ltd", paymentMethod: "Bank Transfer", amount: 105000, status: "completed", date: "2024-01-14 16:42", cashier: "Grace Wanjiku", branch: "Main Branch" },
  { id: "TXN-2024-0840", customer: "Patel & Sons", paymentMethod: "Card", amount: 30000, status: "refunded", date: "2024-01-14 15:18", cashier: "Mary Achieng", branch: "Westlands Branch" },
];

export const SALES_DATA_7D = [
  { day: "Mon 8", sales: 248000, transactions: 14 },
  { day: "Tue 9", sales: 312000, transactions: 18 },
  { day: "Wed 10", sales: 185000, transactions: 11 },
  { day: "Thu 11", sales: 420000, transactions: 23 },
  { day: "Fri 12", sales: 395000, transactions: 21 },
  { day: "Sat 13", sales: 528000, transactions: 29 },
  { day: "Sun 14", sales: 201000, transactions: 12 },
];

export const SALES_DATA_30D = Array.from({ length: 30 }, (_, i) => ({
  day: `Jan ${i + 1}`,
  sales: Math.floor(150000 + Math.random() * 400000),
  transactions: Math.floor(8 + Math.random() * 28),
}));

export const MONTHLY_REVENUE = [
  { month: "Jul", revenue: 3240000, expenses: 1980000, profit: 1260000 },
  { month: "Aug", revenue: 3580000, expenses: 2100000, profit: 1480000 },
  { month: "Sep", revenue: 2980000, expenses: 1840000, profit: 1140000 },
  { month: "Oct", revenue: 4120000, expenses: 2360000, profit: 1760000 },
  { month: "Nov", revenue: 4890000, expenses: 2680000, profit: 2210000 },
  { month: "Dec", revenue: 6240000, expenses: 3100000, profit: 3140000 },
  { month: "Jan", revenue: 3920000, expenses: 2240000, profit: 1680000 },
];

export const CUSTOMERS = [
  { id: "c1", name: "Nairobi Tech Hub", phone: "+254 720 123 456", email: "orders@nairobtech.co.ke", totalPurchases: 1245000, balance: 115000, lastPurchase: "2024-01-15", status: "active" },
  { id: "c2", name: "Equity Bank Ltd", phone: "+254 763 000 000", email: "procurement@equitybank.co.ke", totalPurchases: 892000, balance: 0, lastPurchase: "2024-01-15", status: "active" },
  { id: "c3", name: "Mwangi Traders", phone: "+254 722 345 678", email: "mwangitraders@gmail.com", totalPurchases: 234500, balance: 38500, lastPurchase: "2024-01-15", status: "active" },
  { id: "c4", name: "ABC Enterprises", phone: "+254 733 456 789", email: "info@abcenterprises.co.ke", totalPurchases: 512000, balance: 0, lastPurchase: "2024-01-14", status: "active" },
  { id: "c5", name: "Kenya Power Ltd", phone: "+254 20 3201 000", email: "supply@kplc.co.ke", totalPurchases: 1890000, balance: 0, lastPurchase: "2024-01-14", status: "active" },
  { id: "c6", name: "Patel & Sons Hardware", phone: "+254 711 234 567", email: "purchases@patelsons.co.ke", totalPurchases: 345000, balance: 30000, lastPurchase: "2024-01-13", status: "active" },
  { id: "c7", name: "Safaricom PLC", phone: "+254 722 000 000", email: "vendor@safaricom.co.ke", totalPurchases: 2340000, balance: 0, lastPurchase: "2024-01-10", status: "active" },
  { id: "c8", name: "Wanjiku Electronics", phone: "+254 756 789 012", email: "wanjiku.elec@gmail.com", totalPurchases: 89000, balance: 12000, lastPurchase: "2024-01-08", status: "inactive" },
];

export const SUPPLIERS = [
  { id: "s1", name: "TechSupply Ltd", contact: "John Kamau", phone: "+254 720 000 001", email: "orders@techsupply.co.ke", address: "Industrial Area, Nairobi", products: 45, totalPurchases: 4230000, outstanding: 340000, status: "active" },
  { id: "s2", name: "Appliance World", contact: "Fatuma Hassan", phone: "+254 722 000 002", email: "supply@applianceworld.co.ke", address: "Tom Mboya Street, Nairobi", products: 18, totalPurchases: 1870000, outstanding: 0, status: "active" },
  { id: "s3", name: "AudioZone", contact: "Brian Otieno", phone: "+254 733 000 003", email: "brian@audiozone.co.ke", address: "Westlands, Nairobi", products: 12, totalPurchases: 645000, outstanding: 85000, status: "active" },
  { id: "s4", name: "Office Gear Co", contact: "Priya Patel", phone: "+254 711 000 004", email: "procurement@officegear.co.ke", address: "Upper Hill, Nairobi", products: 8, totalPurchases: 287000, outstanding: 0, status: "active" },
  { id: "s5", name: "Camera House", contact: "Michael Njoroge", phone: "+254 745 000 005", email: "supply@camerahouse.co.ke", address: "CBD, Nairobi", products: 5, totalPurchases: 520000, outstanding: 0, status: "active" },
  { id: "s6", name: "Accessories Plus", contact: "Lisa Wangari", phone: "+254 756 000 006", email: "orders@accessoriesplus.co.ke", address: "Ngong Road, Nairobi", products: 22, totalPurchases: 198000, outstanding: 45000, status: "active" },
];

export const WORKERS = [
  { id: "w1", name: "Grace Wanjiku", role: "Cashier", email: "grace.w@bizledger.com", phone: "+254 745 678 901", branch: "Main Branch", status: "active", lastActive: "2024-01-15 11:42" },
  { id: "w2", name: "Peter Njoroge", role: "Stock Manager", email: "peter.n@bizledger.com", phone: "+254 756 789 012", branch: "Industrial Area Branch", status: "active", lastActive: "2024-01-15 09:15" },
  { id: "w3", name: "Mary Achieng", role: "Sales Associate", email: "mary.a@bizledger.com", phone: "+254 767 890 123", branch: "Main Branch", status: "active", lastActive: "2024-01-15 10:30" },
  { id: "w4", name: "Kevin Mwenda", role: "Cashier", email: "kevin.m@bizledger.com", phone: "+254 712 890 124", branch: "Westlands Branch", status: "active", lastActive: "2024-01-14 18:00" },
  { id: "w5", name: "Anne Chebet", role: "Stock Manager", email: "anne.c@bizledger.com", phone: "+254 723 901 235", branch: "Main Branch", status: "active", lastActive: "2024-01-15 08:45" },
  { id: "w6", name: "Joseph Kamau", role: "Cashier", email: "joseph.k@bizledger.com", phone: "+254 734 012 346", branch: "Industrial Area Branch", status: "inactive", lastActive: "2024-01-10 16:30" },
  { id: "w7", name: "Ruth Moraa", role: "Sales Associate", email: "ruth.m@bizledger.com", phone: "+254 745 123 457", branch: "Westlands Branch", status: "active", lastActive: "2024-01-15 11:00" },
];

export const BRANCHES = [
  { id: "b1", name: "Main Branch", manager: "Sarah Kimani", workers: 12, todaySales: 252500, stockValue: 3240000, status: "active", location: "Tom Mboya Street, Nairobi CBD" },
  { id: "b2", name: "Westlands Branch", manager: "David Mwangi", workers: 8, todaySales: 148000, stockValue: 1870000, status: "active", location: "Sarit Centre, Westlands" },
  { id: "b3", name: "Industrial Area Branch", manager: "Kevin Odhiambo", workers: 6, todaySales: 89000, stockValue: 980000, status: "active", location: "Mombasa Road, Industrial Area" },
];

export const EXPENSES = [
  { id: "e1", date: "2024-01-15", category: "Utilities", description: "Electricity bill - Main Branch", amount: 24500, method: "Bank Transfer", recordedBy: "Sarah Kimani", status: "approved" },
  { id: "e2", date: "2024-01-15", category: "Transport", description: "Stock delivery from TechSupply", amount: 3500, method: "Cash", recordedBy: "Peter Njoroge", status: "approved" },
  { id: "e3", date: "2024-01-14", category: "Salaries", description: "January salary advance - 3 staff", amount: 45000, method: "Bank Transfer", recordedBy: "James Okafor", status: "approved" },
  { id: "e4", date: "2024-01-14", category: "Marketing", description: "Social media ads - Facebook & Google", amount: 8500, method: "Card", recordedBy: "Sarah Kimani", status: "approved" },
  { id: "e5", date: "2024-01-13", category: "Rent", description: "Monthly rent - Westlands Branch", amount: 85000, method: "Bank Transfer", recordedBy: "James Okafor", status: "approved" },
  { id: "e6", date: "2024-01-12", category: "Other", description: "Office supplies and stationery", amount: 2800, method: "Cash", recordedBy: "Mary Achieng", status: "pending" },
  { id: "e7", date: "2024-01-10", category: "Rent", description: "Monthly rent - Main Branch", amount: 120000, method: "Bank Transfer", recordedBy: "James Okafor", status: "approved" },
  { id: "e8", date: "2024-01-09", category: "Stock Purchase", description: "Stock from TechSupply Ltd", amount: 280000, method: "Bank Transfer", recordedBy: "Peter Njoroge", status: "approved" },
];

export const LEDGER_ENTRIES = [
  { id: "L-2024-0847", date: "2024-01-15", ref: "TXN-2024-0847", description: "Sales - Nairobi Tech Hub", debit: null, credit: 115000, balance: 2483000, category: "Sales Revenue" },
  { id: "L-2024-0846", date: "2024-01-15", ref: "TXN-2024-0846", description: "Sales - Walk-in Customer", debit: null, credit: 24500, balance: 2368000, category: "Sales Revenue" },
  { id: "L-2024-0845", date: "2024-01-15", ref: "EXP-2024-0115", description: "Electricity Bill - Main Branch", debit: 24500, credit: null, balance: 2343500, category: "Utilities" },
  { id: "L-2024-0844", date: "2024-01-15", ref: "TXN-2024-0845", description: "Sales - Equity Bank Ltd", debit: null, credit: 58000, balance: 2368000, category: "Sales Revenue" },
  { id: "L-2024-0843", date: "2024-01-14", ref: "TXN-2024-0841", description: "Sales - Kenya Power Ltd", debit: null, credit: 105000, balance: 2310000, category: "Sales Revenue" },
  { id: "L-2024-0842", date: "2024-01-14", ref: "EXP-2024-0114", description: "Salary Advance - 3 Staff", debit: 45000, credit: null, balance: 2205000, category: "Salaries" },
  { id: "L-2024-0841", date: "2024-01-13", ref: "EXP-2024-0113", description: "Westlands Branch Rent", debit: 85000, credit: null, balance: 2250000, category: "Rent" },
  { id: "L-2024-0840", date: "2024-01-10", ref: "EXP-2024-0110", description: "Main Branch Rent", debit: 120000, credit: null, balance: 2335000, category: "Rent" },
  { id: "L-2024-0839", date: "2024-01-09", ref: "PO-2024-0045", description: "Stock Purchase - TechSupply Ltd", debit: 280000, credit: null, balance: 2455000, category: "Stock Purchase" },
];

export const STOCK_MOVEMENTS = [
  { id: "sm1", date: "2024-01-15 09:30", product: "Samsung 55\" 4K Smart TV", action: "Stock Added", qty: 5, prevStock: 7, newStock: 12, by: "Peter Njoroge", reason: "Stock purchase from TechSupply" },
  { id: "sm2", date: "2024-01-15 11:32", product: "HP EliteBook 840 G10", action: "Stock Sold", qty: 1, prevStock: 9, newStock: 8, by: "Grace Wanjiku", reason: "Sale TXN-2024-0847" },
  { id: "sm3", date: "2024-01-14 16:42", product: "Sony 65\" OLED Bravia TV", action: "Stock Sold", qty: 1, prevStock: 5, newStock: 4, by: "Grace Wanjiku", reason: "Sale TXN-2024-0841" },
  { id: "sm4", date: "2024-01-14 14:00", product: "Apple AirPods Pro 2nd Gen", action: "Stock Adjustment", qty: -10, prevStock: 10, newStock: 0, by: "Peter Njoroge", reason: "Damaged goods removal" },
  { id: "sm5", date: "2024-01-13 10:15", product: "LG 8kg Front Load Washer", action: "Stock Added", qty: 3, prevStock: 0, newStock: 3, by: "Anne Chebet", reason: "New delivery from Appliance World" },
  { id: "sm6", date: "2024-01-12 08:45", product: "Canon PIXMA G3430 Printer", action: "Stock Sold", qty: 1, prevStock: 3, newStock: 2, by: "Joseph Kamau", reason: "Sale TXN-2024-0835" },
];

export const NOTIFICATIONS = [
  { id: "n1", type: "warning", title: "Low Stock Alert", message: "LG 8kg Front Load Washer is running low (3 units remaining)", time: "10 min ago", read: false },
  { id: "n2", type: "danger", title: "Out of Stock", message: "Apple AirPods Pro 2nd Gen is now out of stock", time: "2 hours ago", read: false },
  { id: "n3", type: "success", title: "Payment Received", message: "KES 115,000 received from Nairobi Tech Hub", time: "3 hours ago", read: false },
  { id: "n4", type: "info", title: "New Worker Added", message: "Ruth Moraa has been added to Westlands Branch", time: "Yesterday", read: true },
  { id: "n5", type: "warning", title: "Low Stock Alert", message: "Canon PIXMA G3430 Printer — 2 units remaining", time: "Yesterday", read: true },
  { id: "n6", type: "success", title: "Sale Completed", message: "Transaction TXN-2024-0841 — KES 105,000", time: "Yesterday", read: true },
];

export const formatCurrency = (amount: number) =>
  `KES ${amount.toLocaleString("en-KE")}`;

export const PERMISSIONS = {
  sales: ["view_sales", "create_sale", "edit_sale", "delete_sale", "approve_sale", "export_sales"],
  inventory: ["view_inventory", "add_stock", "edit_inventory", "delete_product", "adjust_stock", "export_inventory"],
  finance: ["view_income", "view_expenses", "view_ledger", "view_profit_loss", "view_balance_sheet", "manage_finance"],
  workers: ["view_workers", "add_worker", "edit_worker", "delete_worker", "manage_roles"],
  customers: ["view_customers", "add_customer", "edit_customer", "delete_customer"],
  suppliers: ["view_suppliers", "add_supplier", "edit_supplier", "manage_suppliers"],
  reports: ["view_reports", "export_reports", "generate_reports"],
  branches: ["view_branches", "manage_branches"],
  settings: ["view_settings", "manage_settings"],
};

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  owner: Object.values(PERMISSIONS).flat(),
  admin: [
    "view_sales", "create_sale", "edit_sale", "export_sales",
    "view_inventory", "add_stock", "edit_inventory", "export_inventory",
    "view_income", "view_expenses", "view_ledger",
    "view_workers", "add_worker", "edit_worker",
    "view_customers", "add_customer", "edit_customer",
    "view_suppliers", "add_supplier",
    "view_reports", "export_reports",
    "view_branches", "view_settings",
  ],
  manager: [
    "view_sales", "create_sale", "export_sales",
    "view_inventory", "add_stock", "edit_inventory",
    "view_workers", "view_customers", "add_customer", "edit_customer",
    "view_suppliers", "view_reports",
    "view_branches",
  ],
  cashier: [
    "view_sales", "create_sale",
    "view_inventory",
    "view_customers", "add_customer",
  ],
  stock_manager: [
    "view_inventory", "add_stock", "edit_inventory", "adjust_stock", "export_inventory",
    "view_suppliers", "add_supplier",
    "view_sales",
  ],
  worker: [
    "view_sales", "create_sale",
    "view_inventory",
    "view_customers",
  ],
};

// Note: platform subscription/billing (the KES 500/mo or KES 5,000 lifetime plan
// for using BizLedger itself) lives in ./subscription.ts, kept separate from
// this file's business-ledger data which is denominated in KES.
