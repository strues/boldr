import React from 'react';
import PropTypes from 'prop-types';
import cxN from 'classnames';

/**
 * A flag can be used to display an image beside corresponding
 * contents like headings, text, a table etc.
 */
const Flag = props => {
  const { className, children, asset, imageWidth, imageAlignment, ...rest } = props;
  const finalClassName = cxN({
    'boldr-flag__wrapper': true,
    [className]: className && className.length,
  });
  const imageWrapperFinalClassName = cxN({
    'boldr-flag__img-wrapper': true,
    [`boldr-flag__img-wrapper-${imageWidth}`]: true,
  });
  const imageFinalClassName = cxN({
    'boldr-flag__img': true,
  });
  const image = (
    <div className={imageWrapperFinalClassName}>{asset({ className: imageFinalClassName })}</div>
  );
  const contents = <div className="boldr-flag__contents">{children}</div>;
  const isImageLeftAligned = imageAlignment === 'left';

  return (
    <div {...rest} className={finalClassName}>
      {isImageLeftAligned ? image : contents}
      {isImageLeftAligned ? contents : image}
    </div>
  );
};
Flag.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * A function which returns the media element to render in the background.
   * It recieves an props object which should be propagated to the JSX element.
   */
  asset: PropTypes.func.isRequired,

  /**
   * The percentage width of the image which is relative to the
   * parent, defaults to `40`.
   */
  imageWidth: PropTypes.oneOf(['40', '60', '80']),

  /**
   * The alignment of the image, defaults to `left`.
   */
  imageAlignment: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};
Flag.defaultProps = {
  imageWidth: '40',
  imageAlignment: 'left',
};

export default Flag;
