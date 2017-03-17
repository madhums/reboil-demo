
import * as request from './request';

// Create
export function create (endpoint, payload = {}) {
  return request.post(endpoint, payload);
}

// Read
export function get (endpoint) {
  return request.get(endpoint);
}

// Update
export function update (endpoint, payload) {
  return request.put(endpoint, payload);
}

// Remove
export function remove (endpoint) {
  return request.del(endpoint);
}
