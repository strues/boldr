# Flex


### Usage

```jsx
 import { Flex } from '@boldr/ui';

  const Example = () => {
    return (
      <Flex>
      <h1>Some Content</h1>
      </Flex>
    )
  }
```

### Props


| Prop           | Description                            | Type     | Default      |
| ------------ | ---------------------------------------- | -------- | ------------ |
| auto         |  Output css: `flex: 1 1 auto;`           | boolean   | `null`     |
| column       | True renders a flexbox column            | boolean   | `null`   |
| reverse      | Applies the reverse css flex prop        | boolean   | `null`   |
| justify      | `justify-content` css property           | JustifyValue   | `null`  |
| align        | `align-items` css property               | AlignValue   | `null`   |
| shrink       | `flex-shrink` css property               | ShrinkValue   | `null`   |
| wrap         | `flex-wrap` css property                 | WrapValue   | `null`   |
| className    | custom classname                         | string      | `null`     |
       
       
**Type Definitions**

```javascript
type GlobalCssValues = 'initial' | 'inherit' | 'unset';

type WrapValue = 'nowrap' | 'wrap' | 'wrap-reverse' | GlobalCssValues;
type ShrinkValue = 0 | 1 | GlobalCssValues;
type JustifyValue =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
  | GlobalCssValues;
type AlignValue =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'left'
  | 'right'
  | 'first baseline'
  | 'last baseline'
  | 'safe center'
  | 'unsafe center'
  | GlobalCssValues;

```
