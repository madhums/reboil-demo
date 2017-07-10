import 'isomorphic-fetch';
import { API } from '../config';

const requestOptions = {
  cache: 'no-cache',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'include'
};

export function get(endpoint, headers = {}) {
  const options = {
    headers: { ...requestOptions.headers, ...headers }
  };
  return req(endpoint, { ...requestOptions, ...options });
}

export function post(endpoint, payload = {}, headers = {}) {
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { ...requestOptions.headers, ...headers }
  };
  return req(endpoint, { ...requestOptions, ...options });
}

export function put(endpoint, payload = {}, headers = {}) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { ...requestOptions.headers, ...headers }
  };
  return req(endpoint, { ...requestOptions, ...options });
}

export function del(endpoint, payload = {}, headers = {}) {
  const options = {
    method: 'DELETE',
    body: JSON.stringify(payload),
    headers: { ...requestOptions.headers, ...headers }
  };
  return req(endpoint, { ...requestOptions, ...options });
}

// This is where the actual request happens

function req(endpoint, options) {
  const url =
    endpoint.includes(API) ||
    endpoint.startsWith('https://') ||
    endpoint.startsWith('http://')
      ? endpoint
      : API + endpoint;

  return fetch(url, options)
    .then(response => {
      if (options.method === 'DELETE' && response.ok) {
        return Promise.resolve({ json: '', response });
      }
      return response
        .json()
        .then(json => ({ json, response }))
        .catch(e => ({ json: e, response }));
    })
    .then(({ json, response }) => {
      if (!response.ok) throw json;
      return json;
    });
}
