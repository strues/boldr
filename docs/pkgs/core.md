# `@boldr/core`


### createApolloClient

createApolloClient configures an instance of ApolloClient for use in the app. It accepts a config object.
The values are documented below...


```javascript
// config options object within createApolloClient
const {
  headers, // Object
  initialState = {}, // Object
  batchRequests = false, // boolean
  trustNetwork = true, // boolean
  queryDeduplication = true, // boolean
  uri, // string
  connectToDevTools = true, // boolean
  ssrForceFetchDelay = 100, //number
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

import { createBoldrStore, createApolloClient, createHistory, wrapBoldrApp } from '@boldr/core';

 const history = createHistory();
 const apolloClient = createApolloClient({
  batchRequests: true,
  initialState: preloadedState,
  uri: process.env.GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const preloadedState = {};
const appReducer = {};


// Create the redux store by passing the "main" reducer, preloadedState, and the Apollo Client
const reduxStore = createBoldrStore(history, appReducer, preloadedState, apolloClient);

const AppComponent = PassedApp => <ConnectedRouter history={history}>{PassedApp}</ConnectedRouter>;
const DOM_NODE = document.getElementById('app');

// wrapBoldrApp
ReactDOM.render(wrapBoldrApp(AppComponent(<App />), apolloClient, reduxStore), DOM_NODE);
```

### Reducers

Boldr reducer includes notifications, settings and ui sub-reducers.

#### Notifications
Exports the following actions:

- hideNotification    
- removeNotification   
- sendNotification   
- clearNotifications   

#### UI
Exports the following actions:

- changeLayout
- toggleModal
- setMobileDevice
- toggleDrawer
- toggleCollapse



#### Validations


Contains LocalStorage mock for SSR environment. Token parsing, get/set/remove, and a validation check.


#### Auth Helpers

###### getToken

```javascript
import { getToken } from `@boldr/core`;

// retrieves token with the bjwt key from LocalStorage (if available)
const token = getToken();
```

###### parseJWT

```javascript
import { getToken, parseJWT } from `@boldr/core`;

type ParsedJwt = {
  signature: string,
  header: string,
  payload: Object,
};
// retrieves token with the bjwt key from LocalStorage (if available)
const token = getToken();
const parsed: ParsedJwt = parseJWT(token);

```

###### setToken

```javascript
import { setToken } from `@boldr/core`;

function login() {
  fetch('/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'user', password: 'password' })
  })
  .then(r => r.json())
  .then(res => {
    setToken(res.data.token)
  }).catch(err => console.log(err));
}
```

###### removeToken

```javascript
import { removeToken } from `@boldr/core`;

function logout(token) {
  removeToken(token);
}
```
