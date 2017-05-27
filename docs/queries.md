# Queries


### Signup User
```graphql
mutation ($user: UserSignupInput!) {
  signupUser(user: $user) {
    id
    firstName
    lastName
    username
    email
  }
}
```

**Variables**
```
{
  "user": {
    "username": "testuser",
    "password": "password",
    "email": "admin@boldr.io",
    "firstName": "Steven",
    "lastName": "steven"
  }
}
```

### Login User

```graphql
mutation ($user: UserLoginInput!) {
    loginUser(user: $user) {
      token,
      user {
        id
        username
        firstName
        lastName
        email
        roles {
          id
          name
        }
      },
      errors {
        key
        value
      }
    }
}
```

**Variables**
```
{
  "user": {
    "password": "password",
    "email": "admin@boldr.io",
  }
}
```
