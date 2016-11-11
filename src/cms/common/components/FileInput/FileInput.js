import React, { PureComponent, PropTypes } from 'react';
import { Icon } from 'semantic-ui-react';

/**
 * The `FileInput` component is used as simple styling for the `<input type="file" />`.
 * It will style the input as a raised button by default.
 */
class FileInput extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    flat: PropTypes.bool,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
  };

  static defaultProps = {
    label: 'Select a file from your computer',
    iconChildren: 'file_upload',
  };

  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

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
        className="ui.button"
        disabled={ props.disabled }
        htmlFor={ id }
      >
        <input
          { ...props }
          id={ id }
          aria-hidden="true"
          type="file"
          className="md-file-input"
          onChange={ this._handleChange }
        />

      </label>
    );
  }
}

export default FileInput;
