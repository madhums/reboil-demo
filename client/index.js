
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';

import App from './containers/App';

import history from './lib/history';

import store from './store';
import rootSaga from './sagas';

store.runSaga(rootSaga);

function render (Component) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Route component={Component} />
        </Router>
      </Provider>
    </AppContainer>
    ,
    document.getElementById('app')
  )
}

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App);
  });
}
