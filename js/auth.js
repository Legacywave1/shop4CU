// Handles login, registration, logout

import { apiFetch, setToken, removeToken } from './api.js';

export async function register(username, password, role = 'user') {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, role })
  });
}

export async function login(username, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  setToken(data.token);
  localStorage.setItem('role', data.role);
  return data;
}

export function logout() {
  removeToken();
  window.location.href = 'login.html';
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

export function getRole() {
  return localStorage.getItem('role');
}