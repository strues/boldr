import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const IconButtonLayout = props => {
  const { theme, hover, active, disabled, height, children } = props;

  const className = cn(
    {
      'boldr-iconbtn': true,
      [`boldr-iconbtn--${[theme]}`]: true,
      'boldr-iconbtn__hover': hover,
      'boldr-iconbtn__active': active,
      'boldr-iconbtn__disabled': disabled,
      // [styles[`height${height}`]]: height !== 'medium',
    },
    children.props.className,
  );

  const _style = Object.assign({}, children.props.style, {
    height,
    display: 'inline-block',
  });

  if (React.Children.count(children) === 1) {
    return React.cloneElement(
      children,
      { className, style: _style },
      <div className="boldr-iconbtn__inner">{children.props.children}</div>,
    );
  }
};

IconButtonLayout.defaultProps = {
  height: 'medium',
  theme: 'icon-standard',
};

IconButtonLayout.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  height: PropTypes.oneOf(['small', 'medium', 'large']),
  hover: PropTypes.bool,
  theme: PropTypes.oneOf([
    'transparent',
    'close-transparent',
    'icon-greybackground',
    'icon-standard',
    'icon-standardsecondary',
    'icon-white',
    'icon-whitesecondary',
  ]),
};

IconButtonLayout.displayName = 'IconButtonLayout';

export default IconButtonLayout;
