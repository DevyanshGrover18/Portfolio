import { clearAdminToken, getAdminAuthHeaders } from "./adminAuth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.status === 401) clearAdminToken();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
};

const headers = () => ({ "Content-Type": "application/json", ...getAdminAuthHeaders() });

export const portfolioContentService = {
  seed: () => request(`${API_BASE}/api/admin/content/seed`, { method: "POST", headers: headers() }),
  get: (section, admin = false) => request(`${API_BASE}/api/${admin ? "admin/" : ""}content/${section}`, admin ? { headers: headers() } : {}),
  create: (section, data) => request(`${API_BASE}/api/admin/content/${section}`, { method: "POST", headers: headers(), body: JSON.stringify(data) }),
  update: (section, id, data) => request(`${API_BASE}/api/admin/content/${section}/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }),
  delete: (section, id) => request(`${API_BASE}/api/admin/content/${section}/${id}`, { method: "DELETE", headers: headers() }),
};
