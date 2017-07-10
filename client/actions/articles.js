export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_REQUEST = `${FETCH_ARTICLES}_REQUEST`;
export const FETCH_ARTICLES_SUCCESS = `${FETCH_ARTICLES}_SUCCESS`;
export const FETCH_ARTICLES_FAILURE = `${FETCH_ARTICLES}_FAILURE`;

export function fetchArticles(params) {
  return { type: FETCH_ARTICLES, ...params };
}
