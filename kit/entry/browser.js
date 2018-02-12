import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';

import { browserClient } from 'kit/lib/apollo';

import createNewStore from 'kit/lib/redux';

import App from 'app/index';

const client = browserClient();

const store = createNewStore(client);

function render() {
  ReactDOM.render(
    <Root />,
    document.getElementById('main'),
  );
}

const Root = (() => {
  const Chain = () => (
    <BrowserRouter>
      <ApolloProvider store={store} client={client}>
          <App />
      </ApolloProvider>
    </BrowserRouter>
  );

  if (module.hot) {

    const AppContainer = require('react-hot-loader').AppContainer;

    module.hot.accept('app/index', () => {
      require('app/index').default;
      render();
    });

    return () => (
      <AppContainer>
        <Chain />
      </AppContainer>
    );
  }
  return Chain;
})();

render();
