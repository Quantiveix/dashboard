export const kpiData = {
  totalBalance: 284750,
  monthlySpend: 12430,
  savingsRate: 34.2,
  netWorthTrend: 8.5,
  investmentReturn: 12.8,
  debtRatio: 18.4,
  creditScore: 782,
  cashFlow: 6070,
  sparklines: {
    balance: [260, 265, 270, 268, 275, 280, 278, 282, 284, 285, 283, 285],
    spend: [11, 12.5, 13, 11.8, 12, 12.4, 11.9, 13.2, 12.8, 12.1, 12.6, 12.4],
    savings: [28, 30, 31, 29, 32, 33, 34, 33, 35, 34, 33, 34.2],
    netWorth: [3, 4, 5, 4.5, 6, 7, 7.5, 8, 8.2, 8.5, 8.3, 8.5],
    investment: [8, 9, 10, 9.5, 11, 12, 11.5, 12, 12.5, 12.8, 12.6, 12.8],
    debt: [25, 24, 23, 22, 21, 20, 19.5, 19, 18.8, 18.6, 18.5, 18.4],
    credit: [720, 730, 740, 745, 750, 758, 762, 770, 775, 778, 780, 782],
    cashFlow: [4200, 4800, 5100, 5500, 5200, 5800, 5600, 6000, 5900, 6100, 5800, 6070],
  },
};

export const analyticsData = {
  monthly: [
    { month: "Jan", income: 18500, expenses: 12200, savings: 6300, investments: 2500 },
    { month: "Feb", income: 19200, expenses: 11800, savings: 7400, investments: 3000 },
    { month: "Mar", income: 17800, expenses: 13100, savings: 4700, investments: 2200 },
    { month: "Apr", income: 20100, expenses: 12600, savings: 7500, investments: 3500 },
    { month: "May", income: 19500, expenses: 11900, savings: 7600, investments: 2800 },
    { month: "Jun", income: 21000, expenses: 13400, savings: 7600, investments: 3200 },
    { month: "Jul", income: 20300, expenses: 12800, savings: 7500, investments: 3100 },
    { month: "Aug", income: 22100, expenses: 14200, savings: 7900, investments: 3800 },
    { month: "Sep", income: 21500, expenses: 13500, savings: 8000, investments: 3400 },
    { month: "Oct", income: 23000, expenses: 14800, savings: 8200, investments: 4000 },
    { month: "Nov", income: 22400, expenses: 13900, savings: 8500, investments: 3700 },
    { month: "Dec", income: 24200, expenses: 15100, savings: 9100, investments: 4200 },
  ],
  weeklyTrend: [
    { week: "W1", income: 5200, expenses: 3100 },
    { week: "W2", income: 4800, expenses: 3400 },
    { week: "W3", income: 5500, expenses: 2900 },
    { week: "W4", income: 6100, expenses: 3700 },
  ],
};

export const transactions = [
  { id: 1, date: "2026-03-28", description: "Netflix Subscription", category: "Entertainment", amount: -15.99, status: "Completed" },
  { id: 2, date: "2026-03-27", description: "Salary Deposit", category: "Income", amount: 8500, status: "Completed" },
  { id: 3, date: "2026-03-26", description: "Whole Foods Market", category: "Groceries", amount: -234.50, status: "Completed" },
  { id: 4, date: "2026-03-25", description: "Electric Bill", category: "Utilities", amount: -142.30, status: "Completed" },
  { id: 5, date: "2026-03-24", description: "Freelance Payment", category: "Income", amount: 3200, status: "Pending" },
  { id: 6, date: "2026-03-23", description: "Uber Ride", category: "Transport", amount: -28.50, status: "Completed" },
  { id: 7, date: "2026-03-22", description: "Amazon Purchase", category: "Shopping", amount: -89.99, status: "Completed" },
  { id: 8, date: "2026-03-21", description: "Gym Membership", category: "Health", amount: -49.99, status: "Completed" },
  { id: 9, date: "2026-03-20", description: "Dividend Income", category: "Income", amount: 450, status: "Completed" },
  { id: 10, date: "2026-03-19", description: "Restaurant Dinner", category: "Dining", amount: -78.50, status: "Completed" },
  { id: 11, date: "2026-03-18", description: "Gas Station", category: "Transport", amount: -55.00, status: "Completed" },
  { id: 12, date: "2026-03-17", description: "Phone Bill", category: "Utilities", amount: -85.00, status: "Pending" },
  { id: 13, date: "2026-03-16", description: "Clothing Store", category: "Shopping", amount: -199.00, status: "Completed" },
  { id: 14, date: "2026-03-15", description: "Coffee Shop", category: "Dining", amount: -12.50, status: "Completed" },
  { id: 15, date: "2026-03-14", description: "Interest Payment", category: "Income", amount: 125.00, status: "Completed" },
  { id: 16, date: "2026-03-13", description: "Spotify Premium", category: "Entertainment", amount: -9.99, status: "Completed" },
  { id: 17, date: "2026-03-12", description: "Target Groceries", category: "Groceries", amount: -156.80, status: "Completed" },
  { id: 18, date: "2026-03-11", description: "Car Insurance", category: "Transport", amount: -185.00, status: "Completed" },
  { id: 19, date: "2026-03-10", description: "Consulting Fee", category: "Income", amount: 2400, status: "Completed" },
  { id: 20, date: "2026-03-09", description: "Water Bill", category: "Utilities", amount: -65.40, status: "Completed" },
  { id: 21, date: "2026-03-08", description: "Movie Tickets", category: "Entertainment", amount: -32.00, status: "Completed" },
  { id: 22, date: "2026-03-07", description: "Pharmacy", category: "Health", amount: -24.99, status: "Completed" },
  { id: 23, date: "2026-03-06", description: "Chipotle", category: "Dining", amount: -18.75, status: "Completed" },
  { id: 24, date: "2026-03-05", description: "Etsy Purchase", category: "Shopping", amount: -67.00, status: "Pending" },
  { id: 25, date: "2026-03-04", description: "Bonus Payment", category: "Income", amount: 1500, status: "Completed" },
];

export const categories = [
  { name: "Housing", value: 2800, color: "#84a794" },
  { name: "Transport", value: 650, color: "#b2c8bc" },
  { name: "Groceries", value: 890, color: "#b2c2c3" },
  { name: "Entertainment", value: 420, color: "#5a8a6e" },
  { name: "Utilities", value: 380, color: "#6b9e82" },
  { name: "Dining", value: 560, color: "#9dbfad" },
  { name: "Shopping", value: 730, color: "#c4d8cc" },
  { name: "Health", value: 290, color: "#7aad90" },
  { name: "Insurance", value: 340, color: "#a8c4b5" },
  { name: "Subscriptions", value: 120, color: "#d0e0d8" },
];

export const categoryMonthly = [
  { month: "Jan", Housing: 2800, Transport: 600, Groceries: 820, Entertainment: 380, Dining: 490, Shopping: 680 },
  { month: "Feb", Housing: 2800, Transport: 580, Groceries: 850, Entertainment: 410, Dining: 520, Shopping: 710 },
  { month: "Mar", Housing: 2800, Transport: 650, Groceries: 890, Entertainment: 420, Dining: 560, Shopping: 730 },
  { month: "Apr", Housing: 2850, Transport: 620, Groceries: 870, Entertainment: 390, Dining: 540, Shopping: 690 },
  { month: "May", Housing: 2850, Transport: 640, Groceries: 910, Entertainment: 450, Dining: 580, Shopping: 760 },
  { month: "Jun", Housing: 2900, Transport: 670, Groceries: 930, Entertainment: 470, Dining: 600, Shopping: 790 },
];

export const aiInsights = [
  { id: 1, title: "Reduce dining expenses", confidence: 92, description: "Your dining spend increased 15% this month. Consider meal prep to save ~$200/mo.", action: "Set dining budget alert", category: "Spending" },
  { id: 2, title: "Investment opportunity", confidence: 87, description: "Based on your savings rate, you could allocate $500/mo to index funds for projected 8% annual returns.", action: "Explore fund options", category: "Investing" },
  { id: 3, title: "Subscription audit", confidence: 95, description: "3 subscriptions totaling $45/mo have low usage. Consider cancelling unused services.", action: "Review subscriptions", category: "Spending" },
  { id: 4, title: "Emergency fund milestone", confidence: 78, description: "You're 2 months away from reaching your 6-month emergency fund goal.", action: "View savings plan", category: "Savings" },
  { id: 5, title: "Tax optimization", confidence: 84, description: "Maximize 401(k) contributions to reduce taxable income by ~$3,200 this year.", action: "Adjust contributions", category: "Tax" },
  { id: 6, title: "Cash flow optimization", confidence: 90, description: "Moving bill payments to align with income dates could improve cash flow by 12%.", action: "Optimize schedule", category: "Spending" },
  { id: 7, title: "Debt payoff acceleration", confidence: 88, description: "Applying the avalanche method to your credit card could save $420 in interest over 6 months.", action: "View payoff plan", category: "Debt" },
  { id: 8, title: "Insurance review", confidence: 76, description: "Bundling auto and home insurance could save ~$80/mo based on comparable policies.", action: "Get quotes", category: "Savings" },
  { id: 9, title: "Side income potential", confidence: 82, description: "Your freelance income pattern suggests capacity for an additional $1,200/mo from consulting.", action: "Explore opportunities", category: "Income" },
];

export const forecastData = {
  monthly: [
    { month: "Jan", actual: 18500, projected: 18200, lower: 17000, upper: 19400 },
    { month: "Feb", actual: 19200, projected: 18800, lower: 17500, upper: 20100 },
    { month: "Mar", actual: 17800, projected: 19400, lower: 18000, upper: 20800 },
    { month: "Apr", actual: null, projected: 20000, lower: 18500, upper: 21500 },
    { month: "May", actual: null, projected: 20600, lower: 19000, upper: 22200 },
    { month: "Jun", actual: null, projected: 21200, lower: 19500, upper: 22900 },
    { month: "Jul", actual: null, projected: 21800, lower: 20000, upper: 23600 },
    { month: "Aug", actual: null, projected: 22400, lower: 20500, upper: 24300 },
    { month: "Sep", actual: null, projected: 23000, lower: 21000, upper: 25000 },
  ],
  yearly: [
    { year: "2022", actual: 198000, projected: 195000, lower: 185000, upper: 205000 },
    { year: "2023", actual: 215000, projected: 212000, lower: 200000, upper: 224000 },
    { year: "2024", actual: 234000, projected: 230000, lower: 216000, upper: 244000 },
    { year: "2025", actual: 252000, projected: 248000, lower: 232000, upper: 264000 },
    { year: "2026", actual: null, projected: 268000, lower: 248000, upper: 288000 },
    { year: "2027", actual: null, projected: 285000, lower: 262000, upper: 308000 },
    { year: "2028", actual: null, projected: 302000, lower: 276000, upper: 328000 },
  ],
};

export const connectedAccounts = [
  { id: 1, name: "Chase Checking", type: "Bank Account", institution: "JPMorgan Chase", status: "connected" as const, lastSync: "2 min ago", balance: 24350 },
  { id: 2, name: "Amex Platinum", type: "Credit Card", institution: "American Express", status: "connected" as const, lastSync: "5 min ago", balance: -2840 },
  { id: 3, name: "Vanguard 401(k)", type: "Investment", institution: "Vanguard", status: "connected" as const, lastSync: "1 hr ago", balance: 185200 },
  { id: 4, name: "Savings Account", type: "Bank Account", institution: "Ally Bank", status: "pending" as const, lastSync: "Syncing...", balance: 42000 },
  { id: 5, name: "Crypto Wallet", type: "Investment", institution: "Coinbase", status: "error" as const, lastSync: "Failed", balance: 12800 },
  { id: 6, name: "Chase Sapphire", type: "Credit Card", institution: "JPMorgan Chase", status: "connected" as const, lastSync: "10 min ago", balance: -1250 },
  { id: 7, name: "Fidelity IRA", type: "Investment", institution: "Fidelity", status: "connected" as const, lastSync: "30 min ago", balance: 67400 },
  { id: 8, name: "PayPal Business", type: "Bank Account", institution: "PayPal", status: "pending" as const, lastSync: "Syncing...", balance: 3200 },
];

export const systemMetrics = [
  { name: "CPU Usage", key: "cpu", unit: "%" },
  { name: "GPU Usage", key: "gpu", unit: "%" },
  { name: "Predictive Engine", key: "engine", unit: "%" },
  { name: "Memory", key: "memory", unit: "%" },
  { name: "Network I/O", key: "network", unit: "%" },
  { name: "Disk Usage", key: "disk", unit: "%" },
];

export const notificationItems = [
  { id: 1, text: "Large transaction detected: $2,840", time: "2m ago", read: false },
  { id: 2, text: "Monthly report is ready", time: "1h ago", read: false },
  { id: 3, text: "Savings goal milestone reached", time: "3h ago", read: true },
  { id: 4, text: "New AI insight available", time: "5h ago", read: true },
  { id: 5, text: "Credit score updated: 782", time: "8h ago", read: true },
  { id: 6, text: "Bill payment reminder: Phone bill", time: "12h ago", read: true },
  { id: 7, text: "Investment return alert: +2.4%", time: "1d ago", read: true },
];

export const recentActivity = [
  { id: 1, action: "Transaction added", detail: "Netflix Subscription — $15.99", time: "2m ago" },
  { id: 2, action: "Account synced", detail: "Chase Checking updated", time: "5m ago" },
  { id: 3, action: "AI Insight", detail: "New spending recommendation", time: "15m ago" },
  { id: 4, action: "Goal progress", detail: "Emergency fund 78% complete", time: "1h ago" },
  { id: 5, action: "Report generated", detail: "March 2026 monthly report", time: "2h ago" },
];

export const budgetData = [
  { category: "Housing", budget: 3000, spent: 2800, color: "#84a794" },
  { category: "Transport", budget: 800, spent: 650, color: "#b2c8bc" },
  { category: "Groceries", budget: 1000, spent: 890, color: "#b2c2c3" },
  { category: "Entertainment", budget: 500, spent: 420, color: "#5a8a6e" },
  { category: "Dining", budget: 600, spent: 560, color: "#9dbfad" },
  { category: "Shopping", budget: 800, spent: 730, color: "#c4d8cc" },
];

export const goalData = [
  { name: "Emergency Fund", target: 50000, current: 39000, deadline: "Sep 2026" },
  { name: "Vacation Fund", target: 8000, current: 5200, deadline: "Jul 2026" },
  { name: "Down Payment", target: 120000, current: 42000, deadline: "Dec 2027" },
  { name: "New Car Fund", target: 35000, current: 12500, deadline: "Mar 2027" },
];
