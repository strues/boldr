/* @flow */
import React from 'react';

type Props = {
  onClick: () => void,
  children: ReactElement,
  submit: boolean,
  type: String,
  disabled: boolean,
  big: boolean,
  loading: boolean
};

const Button = (props: Props) => {
  const { disabled, loading, big } = props;
  const type = props.submit ? 'submit' : 'button';
  let className = `boldr-btn boldr-btn__${props.type}`;

  if (loading) {
    className += ' boldr-btn__loading';
  }
  if (big) {
    className += ' boldr-btn__big';
  }

  // Unless the disabled state is explicitly set, the button is disabled when loading.
  const isDisabled = (disabled !== undefined ? disabled : loading) || false;

  return (
    <button
      type={ type }
      className={ className }
      disabled={ isDisabled }
      onClick={ props.onClick }
    >
      { props.children }
    </button>
  );
};

Button.defaultProps = {
  type: 'default',
  submit: false,
};

export default Button;
