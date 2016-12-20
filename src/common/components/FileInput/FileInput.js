import React, { PureComponent, PropTypes } from 'react';
import { Icon } from 'semantic-ui-react';

export type Props = {
  style?: Object,
  className?: string,
  accept?: string,
  multiple?: boolean,
  label?: string,
  onChange?: Function,
  id?: string,
};

/**
 * The `FileInput` component is used as simple styling for the `<input type="file" />`.
 * It will style the input as a raised button by default.
 */
class FileInput extends PureComponent {
  static defaultProps = {
    label: 'Select a file from your computer',
  };

  constructor(props: Props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  props: Props;

  _handleChange(e) {
    const { multiple, onChange } = this.props;
    const { files } = e.target;
    if (!multiple) {
      onChange(files[0] || null, e);
    } else {
      onChange(Array.prototype.slice.call(files), e);
    }
  }

  render() {
    const {
      style,
      label,
      id,
      ...props
    } = this.props;
    delete props.onChange;

    return (
      <label
        style={ style }
        className="boldr-btn boldr-btn__button"
        disabled={ props.disabled }
        htmlFor={ id }
      >
        <input
          { ...props }
          id={ id }
          aria-hidden="true"
          type="file"
          className="ui.input"
          onChange={ this._handleChange }
        />

      </label>
    );
  }
}

export default FileInput;
