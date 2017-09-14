import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';
import omit from 'lodash/omit';

// A content wrapper / stage with different themes and padding options.
const ContentPromo = props => {
  const {
    contentsClassName,
    className,
    children,
    theme,
    isTiny,
    isNarrow,
    isWide,
    isCentered,
    ...restProps
  } = props;
  const rest = omit(restProps, ['label']);
  const finalClassName = mergeClassNames({
    'boldr-cont-promo__wrapper': true,
    [`boldr-cont-promo__${theme}`]: true,
    'boldr-cont-promo__tiny': isTiny,
    'boldr-cont-promo__narrow': isNarrow,
    'boldr-cont-promo__wide': isWide,
    'boldr-cont-promo__centered': isCentered,
    [className]: className && className.length,
  });
  const finalContentsClassName = mergeClassNames({
    'boldr-cont-promo__contents': true,
    [contentsClassName]: contentsClassName && contentsClassName.length,
  });

  return (
    <section className={finalClassName} {...rest}>
      <div className={finalContentsClassName}>{children}</div>
    </section>
  );
};
ContentPromo.propTypes = {
  // The children to render within the stage.
  children: PropTypes.node.isRequired,
  // The theme of the stage.
  theme: PropTypes.oneOf(['bright', 'secondary', 'teritary', 'darkGrey', 'grey', 'lightGrey'])
    .isRequired,

  /**
   * If `true`, reduces the top and bottom padding of the wrapper.
   */
  isTiny: PropTypes.bool,

  /**
   * If `true`, reduces the max-width of the inner contents.
   */
  isNarrow: PropTypes.bool,

  /**
   * If `true`, removes width / max-width of the inner contents.
   */
  isWide: PropTypes.bool,

  /**
   * If `true`, centers the passed text contents.
   */
  isCentered: PropTypes.bool,

  /**
   * An optional className to attach to the wrapper.
   */
  className: PropTypes.string,

  /**
   * An optional className to attach to the inner contents wrapper.
   */
  contentsClassName: PropTypes.string,
};
ContentPromo.defaultProps = {
  theme: 'bright',
  isTiny: false,
  isNarrow: false,
  isWide: false,
  isCentered: false,
};

export default ContentPromo;
