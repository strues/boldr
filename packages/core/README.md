# `@boldr/core`


### Client


### createApolloClient

```javascript
// config options object within createApolloClient
const {
  headers,
  initialState = {},
  batchRequests = false,
  trustNetwork = true,
  queryDeduplication = true,
  apolloUri,
  connectToDevTools = true,
  ssrForceFetchDelay = 100,
} = config;

// your app
import { createApolloClient } from '@boldr/core';
const preloadedState = {};
export const apolloClient = createApolloClient({
  batchRequests: true,
  initialState: preloadedState,
  apolloUri: 'http://localhost:2121/api/v1/graphql',
  headers: {
    authorization: `Bearer ${token}`,
  },
});
```

### createBoldrStore
Helper to create the store with all the redux goodies required by Boldr.
The store will look like this:    
```
  - root
   |- app (input from your project)
   |- router
   |- apollo
   |- boldr (for the internals)
```

#### Usage:

```javascript
/**
 *
 * @param  {Function}   appReducer        The reducer for your app.
 * @param  {Object}     preloadedState    Initial values for the state tree
 * @param  {Function}   apolloClient      The bootstrapped ApolloClient
 * @param  {String}     env               The build environment
 * @return {Object}                       The created store
 */

import { createBoldrStore, createApolloClient } from '@boldr/core';

const apolloClient = createApolloClient({...});
const preloadedState = {};
const env = process.env.NODE_ENV;
const appReducer = {};

const reduxStore = createBoldrStore(appReducer, preloadedState, apolloClient, env);
```

### Reducers

Boldr reducer includes notifications, settings and ui sub-reducers.

#### Notifications
Exports the following actions:

- showNotification
- hideNotification
- removeNotification
- hideAllNotifications
- sendNotification
- dismissNotification
- clearNotification

#### UI
Exports the following actions:

- changeLayout
- showModal
- hideModal
- setMobileDevice
- showHideSidebar
- expandCollapseSideMenu
- hideHeader
- showHeader


#### Validations
