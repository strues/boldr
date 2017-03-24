# Heading

```javascript
type Props = {
  size: number,
  color: ?string,
  align: ?string,
  fweight: ?number,
  classname: ?string,
  children: ReactChildren,
  top: ?string,
  bottom: ?string,
  fsize: ?string,
  textDeco: ?string,
};
```

```javascript
  <Heading size={ 1 }>Text</Heading>
```

```javascript
  // Style tag overrides
  const style = {
    color: props.color,
    textAlign: props.align,
    paddingTop: props.top,
    paddingBottom: props.bottom,
    fontSize: props.fsize,
    fontWeight: props.fweight,
    textDecoration: props.textDeco,
  };
```
