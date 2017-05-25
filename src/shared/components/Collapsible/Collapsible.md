# Collapsible

### Usage
```
<Collapsible title="Awesome Title">
    <Paragraph>
        Will render hidden.
    </Paragraph>
</Collapsible>
```

#### Props:

 Name      Type               Definition
  ------  | --------------| ----
children  | ReactChildren | The children to conditionally render.
className | string        | custom css class name
isOpen    | boolean       | When `true`, the contents are rendered.
title     | string        | The title of the Collapsible
onDelete  | function      |  When passed, a trash icon will be rendered beside the toggle icon within the header.
id        | string        |  An optional ID which the anchor will link to and the wrapper will inherit.
onToggle  | function      | A handler which gets called once the component gets toggled, will receive the new isOpen state as the first and only argument.
