import React, { PropTypes } from 'react';
import mergeClassNames from 'classnames';
import style from './style.css';

/**
 * The Hamburger component renders an hamburger icon which should be used to toggle the drawer.
 */
const Hamburger = ({ className, isActive, ...rest }) => {
  const finalClassName = mergeClassNames({
    [style.hamburger]: true,
    [style.isActive]: isActive,
    [className]: className && className.length,
  });

  return (
    <a { ...rest } className={ finalClassName }>
      <div className={ `${style.line} ${style.lineTop}` } />
      <div className={ style.line } />
      <div className={ `${style.line} ${style.lineBottom}` } />
    </a>
  );
};
Hamburger.propTypes = {
  /**
	 * When set to `true`, the icon will be animated into an closing right facing arrow `X`. Defaults to `false`.
	 */
  isActive: PropTypes.bool,
  className: PropTypes.string,
};
Hamburger.defaultProps = { isActive: false };

export default Hamburger;
