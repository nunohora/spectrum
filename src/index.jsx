import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './app';
import store from './store';

import 'semantic-ui-less/semantic.less';
import './helpers/offlinePlugin';

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        {App()}
      </Provider>
    </AppContainer>
    , document.getElementById('app'));
};

renderApp();

if (module.hot) {
  module.hot.accept('./app', () => { renderApp(); });
}
