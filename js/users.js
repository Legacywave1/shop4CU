// API wrappers for users (admin only)

import { apiFetch } from './api.js';

export function getUsers() {
  return apiFetch('/users');
}

export function deleteUser(id) {
  return apiFetch(`/users/${id}`, {
    method: 'DELETE'
  });
}