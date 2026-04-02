# QuantiveIx Dashboard

A high-end **React.js SaaS dashboard** for **QuantiveIx.com**, designed as a financial intelligence command center with a premium, modern UI.

---

## 🚀 Overview

QuantiveIx is a professional financial analytics platform that enables users to:

- Track financial behavior
- Analyze spending patterns
- Visualize insights with interactive charts
- Generate AI-driven predictions
- Monitor system performance in real time

This project is fully responsive, animation-rich, and built with scalability in mind.

---

## 🎨 Branding & Design Tokens

| Token | Value |
|------|------|
| Background | `#020202` |
| Primary Accent | `#84a794` |
| Secondary Accent | `#b2c8bc` |
| Muted Accent | `#b2c2c3` |
| Text | `#ffffff` |
| Font | Mulish (Google Fonts) |

All colors are configured in **Tailwind CSS theme extension**.

---

## 🛠 Tech Stack

- React.js (Functional Components)
- React Router v6
- Context API (Auth State)
- Axios (API Layer)
- Recharts (Data Visualization)
- Tailwind CSS (Styling)

---

## 📁 Project Structure


src/
assets/
components/
layout/
Header.jsx
Sidebar.jsx
MobileDrawer.jsx
ui/
Card.jsx
Button.jsx
Badge.jsx
InputField.jsx
context/
AuthContext.jsx
hooks/
useSidebarCollapse.js
useOutsideClick.js
pages/
auth/
Login.jsx
Signup.jsx
dashboard/
Overview.jsx
FinancialAnalytics.jsx
AIInsights.jsx
Transactions.jsx
AddTransaction.jsx
SpendingCategories.jsx
PredictiveForecasts.jsx
ConnectedAccounts.jsx
SystemMonitor.jsx
ProfileSettings.jsx
router/
AppRouter.jsx
utils/
mockData.js
api.js
index.css
main.jsx


---

## 🔐 Authentication

### Login (`/login`)
- Email + password validation
- Inline error handling
- Shake animation on error
- Redirects to `/dashboard` on success

### Signup (`/signup`)
- Name, email, password validation
- Inline error messages
- Shake animation on error
- Redirects to `/dashboard` on success

### Auth Features
- Managed via `AuthContext`
- Protected routes
- Auto redirect for unauthenticated users

---

## 🧩 Layout System

### Header
- Fixed top navigation
- Search bar with focus animation
- Notification bell with pulse effect
- Profile dropdown with animation
- Outside click handling

### Sidebar
- Collapsible (desktop)
- Icon-only mode when collapsed
- State saved in `localStorage`
- Mobile slide-in drawer with overlay
- Active route highlighting

### Main Content
- Responsive layout grid
- Proper offset for header + sidebar

---

## 📊 Dashboard Pages

### 1. Overview
- KPI cards
- Mini sparklines
- Animated entry + hover effects

### 2. Financial Analytics
- Line & Bar charts (Recharts)
- Income vs Expenses
- Animated tooltips

### 3. AI Insights
- Prediction cards
- Confidence indicators
- Animated entry + AI activity pulse

### 4. Transactions
- Sortable table
- Filters + search
- Pagination / infinite scroll

### 5. Add Transaction
- Fully validated form
- Animated inputs
- Success + error states

### 6. Spending Categories
- Pie / Radial charts
- Category breakdown

### 7. Predictive Forecasts
- Area charts
- Monthly / yearly toggle
- Confidence bands

### 8. Connected Accounts
- Account cards
- Status indicators
- Add new integrations

### 9. System Monitor
- CPU / GPU / Memory metrics
- Live simulation with `setInterval`
- Threshold alerts (>80%)

### 10. Profile & Settings
- Editable profile
- Preferences
- Logout functionality

---

## 🎬 Animations

Implemented using Tailwind + custom keyframes:

- Sidebar transitions
- Mobile drawer slide-in
- Card hover effects
- Chart animations
- Table row stagger
- Form interactions (focus, error, success)
- AI panel bounce effects
- System monitor pulse alerts
- Page transitions

---

## 🔌 Mock Data & API Layer

### `mockData.js`
Contains realistic datasets:
- Transactions
- Categories
- Forecasts
- AI Insights
- System metrics

### `api.js`
- Axios instance
- Base URL configurable
- Auth interceptor
- Mock responses enabled

👉 To switch to real backend:
1. Update base URL
2. Remove mock handlers

---

## ⚙️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/quantiveix-dashboard.git

# Navigate into project
cd quantiveix-dashboard

# Install dependencies
npm install

# Start development server (Vite)
npm run dev
