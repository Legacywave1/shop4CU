// Centralized API helper for all authenticated requests

const API_BASE = 'http://localhost:5000/api';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}
export function removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });
  if (!res.ok) throw await res.json();
  return res.json();
}