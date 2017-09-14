# Dialog


### Usage

```javascript
import { Dialog, Button } from '@boldr/ui';

class Example extends React.Component {
	state = { visible: false }

	triggerDialog = visible => {
		this.setState({ visible });
	};

	render() {
		let dialog;
		if (this.state.visible) {
			dialog = (
				<Dialog
					visible={this.state.visible}
					onClose={() => this.triggerDialog(false)}
					title="Modal"
				>
				<h1>HEY!</h1>
				</Dialog>);
		}

		return (
			<div>
				<Button
					type="primary"
					onClick={() => this.triggerDialog(true)}
				>
					Open
				</Button>
				{dialog}
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```

#### Open from Function

```javscript

import { Dialog, Button } from '@boldr/ui';

const { openDialog, closeDialog } = Dialog;
const id = 'awesome_dialog';

const open = () => {
	openDialog({
		 //  close the dialog by this ID
		dialogId: id,
		title: 'openDialog',
		children: <div>Hello World</div>,
		footer: <Button onClick={() => closeDialog(id)}>Close</Button>,
		onClose() {
			console.log('outer dialog closed');
		}
	});
};

ReactDOM.render(<Button kind="primary" onClick={open}>Open</Button>, mountNode);
```


### Props

| Prop           | Description                            | Type     | Default      |
| ------------ | ---------------------------------------- | -------- | ------------ |
| title        | Customize the cartridge title            | node   | `''`     |
| children     | Box content:: `<Dialog>xxxx</Dialog>`    | node   | `null`   |
| footer       | Bottom content                           | node   | `null`   |
| visible      | Whether or not to open                   | bool   | `false`  |
| closeBtn     | Upper corner close button should display | bool   | `true`   |
| onClose      | close callback                           | func   | `noop`   |
| mask         | display the background                   | bool   | `true`   |
| maskClosable | clicking on the background closes dialog | bool   | `true`   |
| className    | custom classname                         | string | `''`     |
| style        | custom style object                      | object | `{}`     |


#### openDialog

`openDialog(options: object): function`

**`options` Parameter support components in addition to `visible` all attributes except, plus the following parameter**

| Prop           | Description                            | Type     | Default      |
| ------------   | -------------------------------------  | ------   | --------     |
| dialogId   		 | Alternatively, the dialog ID, can be `closeDialog(dialogId)` used to close the dialog box  | string | Random uniqueId  |
| parentComponent |  Optional, a reference to the parent component, used to associate context  | object  | `null` |

If desired component references instance, can be transferred in the form of a function ref to `openDialog`, it does **not support a string ref**.

> `openDialog` The return value is a function of a manual close Dialog, `close(false)` Dialog will not trigger onClose method. Recommended `closeDialog` to close the dialog box.



#### closeDialog

`closeDialog(dialogId: string, options: object): void`

`dialogId` The corresponding call `openDialog` parameters passed when.

`options.triggerOnClose` If it is true triggered when you close `onClose` the callback, `false` when not triggered.

#### Specifies the width of the Dialog

In `style` the width of the window may pop up to specify, ex/ `style={{ width: '600px' }}`.

By default, the pop-up window will adapt to the width of the content, while the minimum width and maximum width.
