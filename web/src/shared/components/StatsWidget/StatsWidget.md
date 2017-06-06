# Stats Widget

```javascript
  type Props = {
    // Statistics object. Expects an object with at least one entry
    // Stats = { string : number }
    stats: Stats,
    // custom css classname for the stats widget
    className: ?string,
    // call the stats widget something else. Defaults to Stats
    title: ?string,
    // size for the header tag <h1>, <h2>, ...etc
    titleSize: ?number,
    // custom css classname for the statistic label
    labelClassName: ?string,
    // custom css classname for the statistic value
    valueClassName: ?string,
    // the html tag to be used
    labelTag: ?string,
    // the html tag to be used
    valueTag: ?string,
  };
```

```javascript
const statsObject = {
  posts: 3,
  users: 4,
  tags: 3,
  dogs: 9,
  cats: 0,
};
  <StatsWidget
    stats={ statsObject }
    title="Stats"
    titleSize={ 4 }
  />
```
