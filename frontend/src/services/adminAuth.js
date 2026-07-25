const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const ADMIN_TOKEN_KEY = "admin_token";

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export const setAdminToken = (token) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const getAdminAuthHeaders = () => {
  const token = getAdminToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
};

const parseResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const loginAdmin = async (pin) => {
  const response = await fetch(`${API_BASE}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pin }),
  });

  return parseResponse(response);
};

export const verifyAdminSession = async () => {
  if (!getAdminToken()) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE}/api/admin/verify`, {
      headers: {
        ...getAdminAuthHeaders(),
      },
    });

    await parseResponse(response);
    return true;
  } catch {
    clearAdminToken();
    return false;
  }
};
