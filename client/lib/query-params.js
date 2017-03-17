
// Taken from
// https://github.com/ReactTraining/react-router/issues/1100#issuecomment-272800685

import browserHistory from './history';
import qs from 'qs';

/**
 * @param {Object} query
 */
export const addQuery = (query) => {
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

function add (location, next) {
  const current = getQuery(location);
  return merge(location, current, next);
}

function remove (location, names) {
  const current = getQuery(location);
  names.forEach(q => delete current[q]);
  return merge(location, current);
}

export function getQuery (location) {
  const search = location.search.slice(1);
  return qs.parse(search);
}

function merge (location, current, next = {}) {
  const query = { ...current, ...next };
  location.search = '?' + qs.stringify(query);
  return location;
}
