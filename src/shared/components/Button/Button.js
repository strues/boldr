import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'react-router-dom/Link';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Loader from '../Loader';

const transition = {
  enter: 'boldrui-loader-wrapper__enter',
  leave: 'boldrui-loader-wrapper__leave',
};
const loaderThemeByBtnThemeIdentifier = {
  primary: 'boldr',
  secondary: 'boldr',
  whitePrimary: 'primary',
  whiteSecondary: 'secondary',
  grey: 'primary',
};

/**
* A button clearly communicates that an action will occur when
* the user touches it.
*/
const Button = props => {
  const {
    className,
    theme,
    isFullWidth,
    isPending,
    isAnchor,
    isTiny,
    isSmall,
    children,
    disabled,
    icon,
    to,
    ...rest
  } = props;
  const finalClassName = classnames({
    [`boldrui-btn__${theme}`]: true,
    ['boldrui-btn__isFullWidth']: isFullWidth,
    ['boldrui-btn__isTiny']: isTiny,
    ['boldrui-btn__isSmall']: isSmall,
    ['boldrui-btn__isPending']: isPending,
    ['boldrui-btn__icon']: icon,
    [className]: className && className.length,
  });
  const loader = (
    <CSSTransitionGroup
      component="span"
      className="boldrui-loader-wrapper"
      transitionName={transition}
      transitionEnterTimeout={900}
      transitionLeaveTimeout={600}
    >
      {isPending
        ? <Loader theme={loaderThemeByBtnThemeIdentifier[theme]} isTiny />
        : null}
    </CSSTransitionGroup>
  );

  if (disabled) {
    rest['aria-disabled'] = disabled;
  }

  if (to) {
    return (
      <Link {...rest} className={finalClassName} to={to}>
        {loader}
        {children}
      </Link>
    );
  }

  if (isAnchor) {
    return (
      <a {...rest} className={finalClassName}>
        {loader}
        {children}
      </a>
    );
  }

  if (icon) {
    return (
      <button {...rest} className={finalClassName}>
        {loader}
        {children}
      </button>
    );
  }

  if (disabled) {
    rest.disabled = disabled;
  }

  return (
    <button {...rest} className={finalClassName}>
      {loader}
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * The style / theme of the button, defaults to `priamry`.
   */
  theme: PropTypes.oneOf([
    'primary',
    'secondary',
    'brightPrimary',
    'brightSecondary',
    'grey',
  ]),
  icon: PropTypes.bool,
  /**
   * If `true`, sets the width of the node to 100% of it's parent.
   */
  isFullWidth: PropTypes.bool,

  /**
   * If `true`, sets the overall size of the node to smaller than normal.
   */
  isSmall: PropTypes.bool,

  /**
   * If `true`, sets the overall size of the node to the smallest size possible.
   */
  isTiny: PropTypes.bool,

  /**
   * If `true`, sets the wrapper to a standard anchor.
   */
  isAnchor: PropTypes.bool,

  /**
   * If `true`, prepends an Loader into the Button. Can be used to
   * indicate a XHR pending status.
   */
  isPending: PropTypes.bool,

  /**
   * If provided, sets the wrapper to a standard react-router Link component.
   */
  to: PropTypes.any,

  /**
   * If the button should be disabled, pass this prop.
   * We had to manually describe this prop since propagating it via
   * the ...rest / spread feature led to warnings by React since `disabled`
   * is not a valid attribute of an `<a/>` HTML node.
   */
  disabled: PropTypes.bool,

  className: PropTypes.string,
};

Button.defaultProps = {
  theme: 'primary',
  isFullWidth: false,
  icon: false,
  isPending: false,
  isAnchor: false,
  isSmall: false,
  disabled: false,
  isTiny: false,
};

export default Button;
