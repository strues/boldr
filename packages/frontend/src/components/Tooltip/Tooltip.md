# Tooltip
Tooltip component

### Usage
  <Tooltip
    content="Tooltip appears on hover"
    onClickOutside={null}
    onShow={function noRefCheck() {}}
    shouldCloseOnClickOutside
    theme="light"
    placement="left">
    <Button kind="primary" outline>Hover Tooltip</Button>
  </Tooltip>

### Props

| Name            | Type                                                          | Default      | Required   | Description |
|-----------------|---------------------------------------------------------------|--------------|------------|-------------|
| children        | ReactChildren                                                 |              |            |             |
| content         | node                                                          |              | true       |             |
| placement       | string (top, right, bottom, left)                             | left         |            |             |
| alignment       | string (top, right, bottom, left, center)                     | center       |            |             |
| showDelay       | number                                                        | 200          |            |             |
| hideDelay       | number                                                        | 500          |            |             |
| showTrigger     | string (custom, mouseenter, mouseleave, click, focus, blur)   | mouseenter   |            |             |
| hideTrigger     | string (custom, mouseenter, mouseleave, click, focus, blur)   | mouseleave   |            |             |
| maxWidth        | string (i.e. '1000px')                                        | 1200px       | false      | The tooltip max width |
| active          | bool                                                          | false        |            |             |
| bounce          | bool                                                          | false        |            |             |
| moveBy          | object ({x: Number, y: Number})                               |              |            |             |
| disabled        | bool                                                          | false        |            |             |
| moveArrowTo     | Number                                                        |              |            | Allows to position the arrow relative to tooltip. Positive value calculates position from left/top. Negative one calculates position from right/bottom. |
| onClickOutside  | func                                                          | null         | false      | Callback when cliking outside |
| appendToParent  | bool                                                          | false        | false      | In some cases when you need a tooltip scroll with your element, you can append the tooltip to the direct parent, just don't forget to apply `relative`, `absolute` positioning. And be aware that some of your styles may leak into tooltip content. |
| zIndex          | number                                                        | 2000         | false      | z index of the tooltip |
| textAlign          | string (right, left, center, justify, initial, inherit)                                                        | center         | -      | alignment of the tooltip's text |
