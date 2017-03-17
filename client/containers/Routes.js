
import React from 'react';
import { Route, Switch } from 'react-router';

// Containers
import NotFound from './NotFound';

// Components
import Home from '../components/Home';

export default function Routes () {
  return (
    <Switch>
      <Route path="/" component={Home} exact />

      <Route path="*" component={NotFound} status={404} />
    </Switch>
  );
}
