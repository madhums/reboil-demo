
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import Routes from './routes';

function render (Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>
    ,
    document.getElementById('app')
  )
}

render(Routes);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    render(Routes);
  });
}
