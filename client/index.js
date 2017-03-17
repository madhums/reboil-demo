
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';

import App from './containers/App';

import store from './store';
import history from './lib/history';

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
