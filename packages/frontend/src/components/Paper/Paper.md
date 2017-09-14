# Paper

The `Paper` component is a simple wrappper that adds box-shadow.

You can also use the scss mixin instead of paper.

### Usage

```scss
  @include md-shadow(5);
```

```javascript
  <Paper zDepth={ 2 } raiseOnHover>
    child elements
  </Paper>
```

### Props:

Name    Type  Definition
--- | --- | ----
component | Function / string | The component to render the paper as. Default div
zDepth | number |The depth of the paper. This should be a number between 0 - 5.
raiseOnHover  | boolean | Boolean if the paper should raise to the `zDepth` of `3` on hover when the initial
children | ReactChildren | Any children to display in the paper.
className | string | custom css class name
