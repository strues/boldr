# `@boldr/auth`

Contains LocalStorage mock for SSR environment. Token parsing, get/set/remove, and a validation check.

Exported Functions
getToken, parseJWT, setToken, removeToken


## Usage

getToken
-----
```javascript
import { getToken } from `@boldr/auth`;

// retrieves token with the bjwt key from LocalStorage (if available)
const token = getToken();
```

parseJWT
-----
```javascript
import { getToken, parseJWT } from `@boldr/auth`;

type ParsedJwt = {
  signature: string,
  header: string,
  payload: Object,
};
// retrieves token with the bjwt key from LocalStorage (if available)
const token = getToken();
const parsed: ParsedJwt = parseJWT(token);

```

setToken
-----
```javascript
import { setToken } from `@boldr/auth`;

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

removeToken
-----
```javascript
import { removeToken } from `@boldr/auth`;

function logout(token) {
  removeToken(token);
}
```
