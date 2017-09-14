## ColorPicker

```jsx

class Simple extends React.Component {
	state = {
		color: '#5197FF'
	}

	handleChange = (color) => {
		this.setState({
			color
		});
	}

	render() {
		const { color } = this.state;
		return (
			<div>
				<ColorPicker color={color} onChange={this.handleChange} />
				<div style={{ color }}>Color: {color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::


```jsx

class Simple extends React.Component {
	state = {
		color: 'rgba(81, 151, 255, 0.6)',
		showAlpha: true
	}

	handleChange = (color) => {
		this.setState({
			color
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorPicker color={color} showAlpha={showAlpha} onChange={this.handleChange} />
				<div style={{ color }}>Color: {color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

```jsx

class Simple extends React.Component {
	state = {
		color: '#FF4444'
	}

	handleChange = (color) => {
		this.setState({
			color
		});
	}

	render() {
		const { color } = this.state;
		return (
			<div>
				<ColorPicker color={color} type="simple" onChange={this.handleChange} />
				<div style={{ color }}>Color: {color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::


```jsx

const ColorBoard = ColorPicker.ColorBoard;

class Simple extends React.Component {
	state = {
		color: '#5197FF'
	}

	handleChange = (color) => {
		this.setState({
			color: color.hex
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorBoard color={color} onChange={this.handleChange} />
				<div className="marginTop10" style={{ color }}>Color: {color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

```jsx
const ColorBoard = ColorPicker.ColorBoard;

class Simple extends React.Component {
	state = {
		color: 'rgba(81, 151, 255, 0.6)',
		showAlpha: true
	}

	handleChange = (color) => {
		this.setState({
			color: color.rgba
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorBoard color={color} showAlpha={showAlpha} onChange={this.handleChange} />
				<div className="marginTop10" style={{ color }}>Color: {color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

### API

#### ColorPicker

| Prop            | Description               | Type                |  Default   | Optional |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color         | the color      | string              |          |   `'#5197FF'`  `'rgba(81, 151, 255, 0.6)'`  |
| showAlpha     | display transparency setting    | bool                | `false`  |   `true/false`     |
| type          | color selector       | string              | `'default'`   |   `'default'`、`'simple'`      |
| presetColors  | array of default colors  | array | [`'#FFFFFF'`, `'#F8F8F8'`, `'#F2F2F2'`, `'#999999'`, `'#444444'`, `'#FF4444'`, `'#FF6500'`, `'#FF884D'`, `'#FFCD00'`, `'#3FBD00'`, `'#3FBC87'`, `'#00CD98'`, `'#5197FF'`, `'#BADCFF'`, `'#FFEFB8'`] |         |
| onChange      | Change the color callback    | func(color)         | `noop`   |         |
| className     | Optional, css class name     | string              | `''`     |         |
| wrapperClassName | Optional, custom trigger The class name of the wrapped node | string | `''`    |         |

#### ColorBoard

| Prop            | Description               | Type                |  Default   | Optional |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color         | the color      | string              |          |   `'#5197FF'`   `'rgba(81, 151, 255, 0.6)'`  |
| showAlpha     | display transparency setting    | bool                | `false`  |   `true/false`     |
| onChange      | on change func    | func(color)         | `noop`   |         |
| className     | Optional, css class name    | string              | `''`     |         |

<style>
	.marginTop10 {
		margin-top: 10px;
	}
</style>
