import React from 'react';
import { Route, Switch } from 'react-router';

// Components
import NotFound from 'components/NotFound';

// Containers
import Home from './Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />

      <Route path="*" component={NotFound} status={404} />
    </Switch>
  );
}
