import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';
import style from './style.css';

const KeyVisual = props => {
  const {
    asset,
    isFaded,
    isSmall,
    isTiny,
    type,
    children,
    className,
    ...rest
  } = props;
  const finalClassName = mergeClassNames({
    [style.wrapper]: true,
    [style.isSmall]: isSmall,
    [style.isTiny]: isTiny,
    [className]: className && className.length,
  });
  const mediaClassName = mergeClassNames({
    [style.mediaWrapper]: true,
    [style['mediaWrapper--faded']]: isFaded,
  });
  const assetProps = { className: style.media };

  switch (type) {
    case 'video':
      assetProps.autoPlay = true;
      assetProps.loop = true;
      assetProps.muted = true;
      assetProps.controls = true;
      assetProps.playsInline = true;
      break;
    case 'iframe':
      assetProps.frameBorder = '0';
      assetProps.allowFullScreen = true;
      break;
    default:
      break;
  }

  return (
    <div {...rest} className={finalClassName}>
      <div className={mediaClassName}>
        {asset(assetProps)}
      </div>
      <div className={style.contents}>
        <div className={style.contentsInner}>
          {children}
        </div>
      </div>
    </div>
  );
};
KeyVisual.propTypes = {
  /**
   * The children to be rendered within the keyvisual.
   */
  children: PropTypes.node.isRequired,
  /**
   * A function which returns the media element to render in the background.
   * It recieves an props object which should be propagated to the JSX element.
   */
  asset: PropTypes.func.isRequired,
  /**
   * When `true`, the background will fade into a black background to
   * create more contrast to the contents.
   */
  isFaded: PropTypes.bool,
  /**
   * When `true`, the Keyvisual will be shrinked to a smaller size.
   */
  isSmall: PropTypes.bool,
  /**
   * When `true`, the Keyvisual will be shrinked to the most tiniest size.
   */
  isTiny: PropTypes.bool,
  className: PropTypes.string,
  /**
   * The type of backrouund, defailts to 'image'.
   */
  type: PropTypes.oneOf(['video', 'image', 'iframe']),
};
KeyVisual.defaultProps = {
  isFaded: false,
  isSmall: false,
  isTiny: false,
  type: 'image',
};

export default KeyVisual;
