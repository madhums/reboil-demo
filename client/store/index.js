import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { isDev } from '../config';
import createSagaMiddleware, { END } from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// This will reduce the file size because we are conditionally including
// https://github.com/reactjs/redux/issues/581#issuecomment-133187076
if (isDev) {
  const createLogger = require('redux-logger').createLogger;
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

export default store;
