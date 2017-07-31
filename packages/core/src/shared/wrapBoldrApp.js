import React from 'react';
import { ApolloProvider } from 'react-apollo';

/**
 * Wrap the React application inside of RHL and the ApolloProvider
 * @param  {ReactElement} Application  the React application
 * @param  {Object} apolloClient the apolloClient
 * @param  {Object} reduxStore   the application's redux store
 * @return {ReactElement}        the wrapped application
 */
export default function wrapBoldrApp(Application, apolloClient, reduxStore) {
  let Wrapped = Application;
  if (apolloClient) {
    Wrapped = (
      <ApolloProvider client={apolloClient} store={reduxStore}>
        {Wrapped}
      </ApolloProvider>
    );
  }

  return Wrapped;
}
