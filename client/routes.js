
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';
import NotFound from './containers/NotFound';
import Home from './components/Home';

export default function Routes () {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
        </Route>
        <Route path="*" component={NotFound} status={404} />
      </Router>
    </Provider>
  );
}
