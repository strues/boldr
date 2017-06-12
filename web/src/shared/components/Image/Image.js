/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import omit from 'lodash/omit';
import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  className: String,
  alt: String,
  width: String,
  imgSrc: String,
};
export const imageQueryPropType = PropTypes.shape({
  minWidth: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  quality: PropTypes.number,
});

/**
 * A responsive image component.
 */
export default class Image extends React.Component {
  static propTypes = {
    /**
     * The division factor for the lazy image size,
     * @example
     *  <Image width={200} height={150} lazyDivideFactory={100}/>
     * would result in a lazy image size of width: 2px and height: 1.5px.
     *
     * We expose this prop so that you can keep the proportions of the
     * original image while the lazy image is in place.
     */
    lazyDivideFactor: PropTypes.number,

    /**
     * If falsy, will not load the image lazyly.
     */
    isLazy: PropTypes.bool,

    /**
     * The base src for the image.
     */
    src: PropTypes.string.isRequired,

    /**
     * The alternative description of the image.
     */
    alt: PropTypes.string.isRequired,

    /**
     * The base image width, used to calculate proportions.
     */
    width: PropTypes.number.isRequired,

    /**
     * The base image height, used to calculate proportions.
     */
    height: PropTypes.number.isRequired,

    /**
     * if provided, an <picture/> element with sources for each item of
     *  the array will be rendered.
     */
    queries: PropTypes.arrayOf(imageQueryPropType),

    /**
     * An optional handler which will be called with the onLoad event
     * of the final image.
     */
    onLoad: PropTypes.func,

    /**
     * An optional className to attach to the wrapper.
     */
    className: PropTypes.string,

    /**
     * Optionally specify your own lazy src which is displayed initially.
     * Usefull if you render a base64 string on the server side initially.
     */
    lazySrc: PropTypes.string,
  };

  static defaultProps = {
    isLazy: true,
    lazyDivideFactor: 100,
    queries: [],
  };

  state = {
    isInViewport: false,
    isImageLoaded: false,
  };

  componentWillUpdate(nextProps: Object) {
    const { isLazy, src, lazySrc } = nextProps;

    if (isLazy && lazySrc !== this.props.lazySrc && src !== this.props.src) {
      this.setState({
        isInViewport: false,
        isImageLoaded: false,
      });
    }
  }

  createSrcForQuery = (src, query) => {
    const { width, height, quality = 60 } = query;
    let newSrc = src.indexOf('?') > 0 ? `${src}&` : `${src}?`;

    if (width) {
      newSrc += `w=${width}`;
    }

    if (height) {
      newSrc += `&h=${height}`;
    }

    return `${newSrc}&fit=crop&crop=entropy&auto=format&q=${quality}`;
  };

  handleImageLoaded = () => {
    const { onLoad } = this.props;

    this.setState({ isImageLoaded: true }, e => {
      if (onLoad) {
        onLoad(e);
      }
    });
  };

  handleViewportVisibilityChange = isInViewport => {
    //
    // Do not allow negations after the value has already changed to true.
    //
    if (isInViewport) {
      this.setState({ isInViewport });
    }
  };
  render() {
    const {
      isLazy,
      lazyDivideFactor,
      src,
      alt,
      queries,
      width,
      height,
      className,
      ...restProps
    } = this.props;
    const { isInViewport, isImageLoaded } = this.state;
    const rest = omit(restProps, ['src', 'onLoad', 'lazySrc']);
    const isImageLoadCapable = isInViewport || isLazy === false;
    const lazySrc =
      this.props.lazySrc ||
      this.createSrcForQuery(src, {
        width: width / lazyDivideFactor,
        height: height / lazyDivideFactor,
      });
    const baseSrc = isImageLoadCapable
      ? this.createSrcForQuery(src, { width, height })
      : lazySrc;
    const sensor = isLazy
      ? <VisibilitySensor
          onChange={this.handleViewportVisibilityChange}
          partialVisibility
        />
      : null;
    const wrapperInlineStyle = isLazy
      ? { backgroundImage: `url("${lazySrc}")` }
      : {};
    const finalClassName = mergeClassNames({
      ['boldrui-img__wrapper']: true,
      [className]: className && className.length,
    });
    const imgFinalClassName = mergeClassNames({
      ['boldrui-img']: true,
      'boldrui-img__loaded': isImageLoaded || isLazy === false,
    });
    const imgProps = {
      className: imgFinalClassName,
      width,
      height,
    };

    if (isInViewport) {
      imgProps.onLoad = this.handleImageLoaded;
    }

    return (
      <picture {...rest} style={wrapperInlineStyle} className={finalClassName}>
        {/* Do not render the VisibilitySensor if the image was already in the UAs viewport. */}
        {isImageLoadCapable ? null : sensor}
        {isImageLoadCapable
          ? queries
              .reduce((pictures, query, index) => {
                const nextQuery = queries[index + 1];
                const { minWidth, ...rest } = query;
                const baseSrc = this.createSrcForQuery(src, rest);
                const defaultSrc = `${baseSrc} 1x`;
                const retinaSrc = `${baseSrc}&dpr=2 2x`;
                let mq = `(min-width: ${minWidth}px)`;

                if (nextQuery) {
                  mq = `(min-width: ${minWidth}px) AND (max-width: ${nextQuery.minWidth - 1}px)`;
                }

                return pictures.concat([
                  {
                    defaultSrc,
                    retinaSrc,
                    minWidth,
                    mq,
                  },
                ]);
              }, [])
              .map((query, index) => {
                const { defaultSrc, retinaSrc, mq } = query;

                return (
                  <source
                    key={index}
                    srcSet={`${defaultSrc}, ${retinaSrc}`}
                    media={mq}
                  />
                );
              })
          : null}

        <img {...imgProps} src={baseSrc} alt={alt} />
      </picture>
    );
  }
}
