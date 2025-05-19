// API wrappers for orders

import { apiFetch } from './api.js';

export function getOrders() {
  return apiFetch('/orders');
}

export function placeOrder(order) {
  return apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(order)
  });
}

export function updateOrder(id, data) {
  return apiFetch(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export function deleteOrder(id) {
  return apiFetch(`/orders/${id}`, {
    method: 'DELETE'
  });
}