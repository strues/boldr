import React from 'react';
import PropTypes from 'prop-types';
import cxN from 'classnames';
/**
 * The Label is used across different form input components.
 */
const Label = props => {
  const { className, label, required, ...rest } = props;
  const finalClassName = cxN({
    'boldrui-form__label': true,
    [className]: className && className.length,
  });

  return (
    <label htmlFor={label} className={finalClassName}>
      {label}
      {required ? <span className="boldrui-form__required"> *</span> : null}
    </label>
  );
};
Label.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.any,

  /**
   * When `true`, the children will be appended an asterix, to
   * indicate the required state of the associated input.
   */
  required: PropTypes.bool,
  className: PropTypes.string,
};
Label.defaultProps = {
  required: false,
};

export default Label;
