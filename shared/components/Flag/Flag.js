import React, { PropTypes } from 'react';
import mergeClassNames from 'classnames';
import style from './style.css';

/**
 * A flag can be used to display an image beside corresponding
 * contents like headings, text, a table etc.
 */
const Flag = props => {
  const {
    className,
    children,
    asset,
    imageWidth,
    imageAlignment,
    isAnimated,
    ...rest
  } = props;
  const finalClassName = mergeClassNames({
    [style.wrapper]: true,
    [className]: className && className.length,
  });
  const imageWrapperFinalClassName = mergeClassNames({
    [style.imgWrapper]: true,
    [style[`imgWrapper--${imageWidth}`]]: true,
  });
  const imageFinalClassName = mergeClassNames({
    [style.img]: true,
    [style.imgAnimated]: isAnimated,
  });
  const image = (
    <div className={ imageWrapperFinalClassName }>
      {asset({ className: imageFinalClassName })}
    </div>
  );
  const contents = (
    <div className={ style.contents }>
      {children}
    </div>
  );
  const isImageLeftAligned = imageAlignment === 'left';

  return (
    <div { ...rest } className={ finalClassName }>
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
   * The percentage width of the image which is relative to the parent, defaults to `40`.
   */
  imageWidth: PropTypes.oneOf(['40', '60', '80']),
  /**
   * The alignment of the image, defaults to `left`.
   */
  imageAlignment: PropTypes.oneOf(['left', 'right']),
  /**
   * When set to `true`, the image will be animated to draw more attention to the contents, defaults to `false`.
   */
  isAnimated: PropTypes.bool,
  className: PropTypes.string,
};
Flag.defaultProps = {
  imageWidth: '40',
  imageAlignment: 'left',
  isAnimated: false,
};

export default Flag;
