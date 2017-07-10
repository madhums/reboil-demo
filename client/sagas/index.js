// Read more: https://redux-saga.github.io/redux-saga/

import qs from 'qs';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../lib/request';

import { API_ERROR } from '../actions/ui';
import { FETCH_ARTICLES } from '../actions/articles';

// Generic wrapper for all API calls
function* entity(ACTION, apiFn, endpoint, payload) {
  try {
    yield put({ type: `${ACTION}_REQUEST` });
    const data = yield call(apiFn, endpoint, payload);
    // if there is no response data, we are passing back the initial payload
    const _payload = data || payload;
    yield put({ type: `${ACTION}_SUCCESS`, payload: _payload });
    return data;
  } catch (e) {
    const errors =
      e.errors && e.errors.map(e => e.detail).filter(e => e).join(', ');
    const error = errors || e.detail || 'Something went wrong';
    yield put({ type: `${ACTION}_FAILURE`, error });
    return { error };
  }
}

function* fetchArticles({ type, ...params }) {
  const q = { ...params };
  yield* entity(FETCH_ARTICLES, api.get, `/articles/?${qs.stringify(q)}`);
}

function* setError({ type, error }) {
  // we are only interested in '*_FAILURE' s
  if (!type.includes('_FAILURE')) return;
  if (error) yield put({ type: API_ERROR, error });
}

// Use google analytics event tracking
// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
function track({ type, ...rest }) {
  if (!window.ga) return;
  // track all except _SUCCESS and _REQUEST actions
  if (type.includes('_SUCCESS') || type.includes('_REQUEST')) return;
  const category = categorize(type);
  window.ga('send', 'event', category, type, '', rest);
}

// use them in parallel
export default function* rootSaga() {
  yield takeEvery(FETCH_ARTICLES, fetchArticles);

  yield takeEvery('*', setError);
  yield takeEvery('*', track);
}

function categorize(type) {
  const action = type.replace('_FAILURE', ''); // helps categorizing
  switch (action) {
    default:
      return `${action} category`;
  }
}
