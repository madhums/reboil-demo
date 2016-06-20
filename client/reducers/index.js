
import { combineReducers } from 'redux'
import { RECEIVE_ARTICLES } from '../actions'

const initialState = {
  isFetching: true,
  articles: [],
  pages: 0,
  page: 0
}

function articles (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return {
        ...action.data,
        isFetching: false
      }
    default:
      return state
  }
}

export default combineReducers({
  articles
})
