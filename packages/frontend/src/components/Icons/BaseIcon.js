import React from 'react';
import PropTypes from 'prop-types';

const BaseIcon = ({ children, color, size, style, ...props }, { reactIconBase = {} }) => {
  const computedSize = size || reactIconBase.size || '1em';
  function onClick(e) {
    if (props.onClick) {
      props.onClick(e);
    }
  }
  return (
    <svg
      children={children}
      fill={color}
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
  color: '#222',
  size: '24',
};

BaseIcon.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

BaseIcon.contextTypes = {
  reactIconBase: PropTypes.shape(BaseIcon.propTypes),
};

export default BaseIcon;
