import axios from "axios";
import { kpiData, analyticsData, transactions, categories, aiInsights, forecastData, connectedAccounts } from "./mockData";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// Auth header interceptor
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("qix_user");
  if (user) {
    config.headers.Authorization = `Bearer mock-token`;
  }
  return config;
});

// Mock response interceptor — intercepts all calls and returns mock data
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";

    const mockResponses: Record<string, unknown> = {
      "/dashboard/kpi": kpiData,
      "/dashboard/analytics": analyticsData,
      "/transactions": transactions,
      "/categories": categories,
      "/ai-insights": aiInsights,
      "/forecasts": forecastData,
      "/accounts": connectedAccounts,
    };

    for (const [path, data] of Object.entries(mockResponses)) {
      if (url.includes(path)) {
        return Promise.resolve({ data, status: 200 });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
