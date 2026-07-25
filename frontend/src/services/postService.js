import { clearAdminToken, getAdminAuthHeaders } from "./adminAuth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const PUBLIC_POSTS_URL = `${API_BASE}/api/posts`;
const ADMIN_POSTS_URL = `${API_BASE}/api/admin/posts`;

const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (response.status === 401) {
    clearAdminToken();
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

const withJsonHeaders = (headers = {}) => ({
  "Content-Type": "application/json",
  ...headers,
});

export const postService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`${PUBLIC_POSTS_URL}${query ? `?${query}` : ""}`);
  },

  getOne: (idOrSlug) => request(`${PUBLIC_POSTS_URL}/${idOrSlug}`),

  getAdminPosts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`${ADMIN_POSTS_URL}${query ? `?${query}` : ""}`, {
      headers: withJsonHeaders(getAdminAuthHeaders()),
    });
  },

  getAdminPost: (id) =>
    request(`${ADMIN_POSTS_URL}/${id}`, {
      headers: withJsonHeaders(getAdminAuthHeaders()),
    }),

  create: (data) =>
    request(ADMIN_POSTS_URL, {
      method: "POST",
      headers: withJsonHeaders(getAdminAuthHeaders()),
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`${ADMIN_POSTS_URL}/${id}`, {
      method: "PUT",
      headers: withJsonHeaders(getAdminAuthHeaders()),
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`${ADMIN_POSTS_URL}/${id}`, {
      method: "DELETE",
      headers: withJsonHeaders(getAdminAuthHeaders()),
    }),
};
