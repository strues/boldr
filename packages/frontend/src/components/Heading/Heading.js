/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import deprecated from 'prop-types-extra/lib/deprecated';

const validTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * A heading should always be the visual and describing start of
 * another content section.
 */

const Heading = ({ className, type, theme, text, isLight, children, ...rest }) => {
  const themeClassName = theme || `boldr-${type}`;
  const finalClassName = cN({
    'boldr-h': true,
    'boldr-h--light': isLight,
    [themeClassName]: true,
    [className]: className && className.length,
  });

  switch (type) {
    case 'h1':
      return (
        <h1 {...rest} className={finalClassName}>
          {text || children}
        </h1>
      );
    case 'h2':
      return (
        <h2 {...rest} className={finalClassName}>
          {text || children}
        </h2>
      );
    case 'h3':
      return (
        <h3 {...rest} className={finalClassName}>
          {text || children}
        </h3>
      );
    case 'h4':
      return (
        <h4 {...rest} className={finalClassName}>
          {text || children}
        </h4>
      );
    case 'h5':
      return (
        <h5 {...rest} className={finalClassName}>
          {text || children}
        </h5>
      );
    case 'h6':
      return (
        <h6 {...rest} className={finalClassName}>
          {text || children}
        </h6>
      );
    default:
      return '';
  }
};

Heading.propTypes = {
  children: deprecated(PropTypes.node, 'Use `text` instead.'),
  isLight: PropTypes.bool,

  /**
   * The semantic type of the heading, default to `h1`.
   */
  type: PropTypes.oneOf(validTypes),
  /**
   * What the headline should say
   * @type {string}
   */
  text: PropTypes.string,

  /**
   * To separate the semantic meaning and the visual styles,
   * you can also set an optional theme, to have the semantic
   * meaning of a `h1` but the visual appearance of a `h4`.
   */
  theme: PropTypes.oneOf(validTypes),
  className: PropTypes.string,
};

Heading.defaultProps = {
  type: 'h1',
};

export default Heading;
