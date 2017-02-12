import { Component, createElement } from 'react';

/**
 * Creates a component class that renders the given React-MD component
 * @name wrapFormComponent
 * @param MDComponent The React-MD component to render
 * @param mapProps A mapping of props provided by redux-form to the props the React-MD
 * component needs
 */
export default function wrapFormComponent(MDComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.refs.component;
    }

    render() {
      return createElement(MDComponent, {
        ...mapProps(this.props),
        ref: 'component',
      });
    }
  }
  InputComponent.displayName = `ReduxFormMD${MDComponent.name}`;
  return InputComponent;
}
