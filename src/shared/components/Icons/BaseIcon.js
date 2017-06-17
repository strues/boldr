/* @flow */
import React from 'react';
import type { Children } from 'react';
import PropTypes from 'prop-types';

type Props = {
  children: Children,
  color: string,
  size: string,
  style: Object,
  onClick: () => void,
};

const BaseIcon = (
  { children, color, size, style, ...props }: Props,
  { reactIconBase = {} },
) => {
  const computedSize = size || reactIconBase.size || '1em';
  function onClick(e: Event) {
    if (props.onClick) {
      props.onClick(e);
    }
  }
  return (
    <svg
      children={children}
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      height={computedSize}
      width={computedSize}
      onClick={onClick}
      {...reactIconBase}
      {...props}
      style={{
        verticalAlign: 'middle',
        color: color || reactIconBase.color,
        ...(reactIconBase.style || {}),
        ...style,
      }}
    />
  );
};

BaseIcon.defaultProps = {
  color: '#fff',
  size: '24',
};
BaseIcon.contextTypes = {
  iconBase: PropTypes.shape(BaseIcon.propTypes),
};

export default BaseIcon;
