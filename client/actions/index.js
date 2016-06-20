
import fetch from 'isomorphic-fetch'
import { apiHeaders as headers, API } from '../config'

const articlesApi = `${API}/articles`

/*
 * action types
 */

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'

function receiveArticles (json) {
  return {
    type: RECEIVE_ARTICLES,
    data: json
  }
}

export function fetchArticles (article = '') {
  return dispatch => {
    return fetch(`${articlesApi}/${article}`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receiveArticles(json)))
  }
}
