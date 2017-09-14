# Portal

This component does not provide a style, but it is the cornerstone of all the shell components. The advantage of using `Portal` is that you do not need to manage your dynamically inserted nodes to prevent memory leaks.

### Usage

```javascript
Import {Portal} from '@boldr/ui';

ReactDOM.render(
	<div className="boldr-doc-portal-container">
		<Div className = "boldr-doc-portal-mount-node"> here is the original content </ div>
		<Portal selector=".boldr-doc-portal-mount-node">
			<Div className = "boldr-doc-portal-content"> Here is the content that Portal is dynamically inserted </ div>
		</Portal>
	</div>
	, mountNode
);
```

### Props

| Parameter | Description | Type | Default | Alternative |
| --------- | ----------------- | --------------------- | -------- |
| Children | required parameters, only one child | string | |  |
| Selector | optional parameter, DOM node that renders child | string or DOM Element | `body'` | legal CSS selector or a DOM node |
| Visible | optional parameter, whether to render child | bool | `true` | |
| ClassName | optional parameter, custom extra class name | string | `` `` | |
| Css | optional parameter, extra css style. For example, `{'margin-left': '10px'}` | object | `{}` | |
| Prefix | optional parameter, custom prefix | string | `boldrui` |  |

`Portal` also provides several high-level components (HOC), which provides some logic for playing layers.

#### withCloseOnEsc

Encapsulates the logic by pressing ESC.

| Parameter | description | type | default value |
| ------- | ------------------------- | ---- | ------ |
| Visible | required parameters, note that this attribute is the original Portal is optional | bool | `true` |
| OnClose | required parameter, ESC press the callback function | func |  ` ` |

```javascript
import { Portal as _Portal } from '@boldr/ui';
const { withCloseOnEsc } = _Portal;
const Portal = withCloseOnEsc(_Portal);
```

#### withNoScroll

Encapsulates the logic that prohibits container scrolling.

| Parameter | description | type | default |
| ------- | ------------------------- | ---- | ------ |
| Visible | required parameters, note that this attribute is the original Portal is optional | bool | `true` |

```javascript
import { Portal as _Portal } from '@boldr/ui';
const { withNoScroll } = _Portal;
const Portal = withNoScroll(_Portal);
```

### Component principle

- The main function of the component is to insert its `child` into a given DOM node and remove the DOM node corresponding to its` child` attribute when the component is `unmount`.
- any props will be modified to trigger a certain degree of redraw,
