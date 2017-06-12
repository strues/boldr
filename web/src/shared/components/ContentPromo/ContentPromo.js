import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';
import omit from 'lodash/omit';

/**
 * A content wrapper / stage with different themes and padding options.
 */
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
    'boldrui-cont-promo__wrapper': true,
    [`boldrui-cont-promo__${theme}`]: true,
    'boldrui-cont-promo__tiny': isTiny,
    'boldrui-cont-promo__narrow': isNarrow,
    'boldrui-cont-promo__wide': isWide,
    'boldrui-cont-promo__centered': isCentered,
    [className]: className && className.length,
  });
  const finalContentsClassName = mergeClassNames({
    'boldrui-cont-promo__contents': true,
    [contentsClassName]: contentsClassName && contentsClassName.length,
  });

  return (
    <section className={finalClassName} {...rest}>
      <div className={finalContentsClassName}>
        {children}
      </div>
    </section>
  );
};
ContentPromo.propTypes = {
  // The children to render within the stage.
  children: PropTypes.node.isRequired,
  // The theme of the stage.
  theme: PropTypes.oneOf([
    'bright',
    'secondary',
    'teritary',
    'darkGrey',
    'grey',
    'lightGrey',
  ]).isRequired,

  /**
   * If `true`, reduces the top and bottom padding of the wrapper.
   */
  isTiny: PropTypes.bool.isRequired,

  /**
   * If `true`, reduces the max-width of the inner contents.
   */
  isNarrow: PropTypes.bool.isRequired,

  /**
   * If `true`, removes width / max-width of the inner contents.
   */
  isWide: PropTypes.bool.isRequired,

  /**
   * If `true`, centers the passed text contents.
   */
  isCentered: PropTypes.bool.isRequired,

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
