import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';

let started = false;
let Root;

export default function render(
  { apolloClient, reduxStore, history },
  component,
  container,
  callback,
) {
  if (started) {
    if (arguments.length === 0) {
      return Root;
    }
  }

  // Use named function get a proper displayName
  Root = function Root() {
    console.log('[BOLDR]: rendering client');
    return (
      <ApolloProvider client={apolloClient} store={reduxStore}>
        <ConnectedRouter history={history}>{component}</ConnectedRouter>
      </ApolloProvider>
    );
  };

  started = true;
  // eslint-disable-next-line
  global.document && ReactDOM.hydrate(<Root />, container, callback);

  return Root;
}
