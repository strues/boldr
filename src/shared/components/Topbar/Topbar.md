# Topbar

```javascript
type Props = {
  toggle: () => void,
  // The links prop refers to links located to the right of the logo.
  links: Array<Object>,
  // Dropdown menu links for the username / avatar
  userLinks: Array<Object>,
  // Links to the left of the user avatar on the righthand side of bar.
  rightLinks: Array<Object>,
  // location of the user's avatar
  avatarUrl: string,
  // user's username
  username: string,
  // Where should the logo link to? Default is /
  logoLink: string,
};
```
