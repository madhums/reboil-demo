
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { isProduction } from '../config'
import thunk from 'redux-thunk'

let middlewares = [thunk]

// This will reduce the file size because we are conditionally including
// https://github.com/reactjs/redux/issues/581#issuecomment-133187076
if (!isProduction) {
  const createLogger = require('redux-logger')
  const logger = createLogger()
  middlewares = [...middlewares, logger]
}

export default createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)
