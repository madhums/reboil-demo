// Taken from
// https://github.com/ReactTraining/react-router/issues/1100#issuecomment-272800685

import qs from 'qs';
import browserHistory from './history';

/**
 * @param {Object} query
 */
export const addQuery = query => {
  const newLocation = add(browserHistory.location, query);
  browserHistory.push(newLocation);
};

/**
 * @param {...String} names
 */
export const removeQuery = (...names) => {
  const newLocation = remove(browserHistory.location, names);
  browserHistory.push(newLocation);
};

export function getQuery() {
  const search = window.location.search.slice(1);
  return qs.parse(search);
}

export function toQS(obj) {
  return qs.stringify(obj, { arrayFormat: 'brackets' });
}

function add(location, next) {
  const current = getQuery();
  return merge(location, current, next);
}

function remove(location, names) {
  const current = getQuery();
  names.forEach(q => delete current[q]);
  return merge(location, current);
}

function merge(location, current, next = {}) {
  const query = { ...current, ...next };
  location.search = '?' + qs.stringify(query);
  return location;
}
