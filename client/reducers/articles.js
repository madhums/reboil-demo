
import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE
} from '../actions/articles';

const initialState = {
  loading: false,
  items: [],
  page: 1,
  pages: 1
};

export default function articles (state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        items: action.payload.articles,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
