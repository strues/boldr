import React from 'react';

import { ApolloProvider } from 'react-apollo';
import StaticRouter from 'react-router-dom/StaticRouter';

export default function serverRender(
  { apolloClient, reduxStore, location, routerContext },
  component,
) {
  let Wrapped = component;
  if (apolloClient) {
    Wrapped = (
      <ApolloProvider client={apolloClient} store={reduxStore}>
        <StaticRouter location={location} context={routerContext}>
          {Wrapped}
        </StaticRouter>
      </ApolloProvider>
    );
  }

  return Wrapped;
}
