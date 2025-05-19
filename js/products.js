// API wrappers for products

import { apiFetch } from './api.js';

export function getProducts() {
  return apiFetch('/products');
}

export function createProduct(product) {
  return apiFetch('/products', {
    method: 'POST',
    body: JSON.stringify(product)
  });
}

export function updateProduct(id, product) {
  return apiFetch(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product)
  });
}

export function deleteProduct(id) {
  return apiFetch(`/products/${id}`, {
    method: 'DELETE'
  });
}