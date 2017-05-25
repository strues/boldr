import React from 'react';
import classNames from 'classnames';

export type Props = {
  reverse?: boolean,
  className?: string,
  style?: Object,
  children?: number | string | React.Element | Array<any>,
  xsStart?: boolean,
  smStart?: boolean,
  mdStart?: boolean,
  lgStart?: boolean,
  xsCenter?: boolean,
  smCenter?: boolean,
  mdCenter?: boolean,
  lgCenter?: boolean,
  xsEnd?: boolean,
  smEnd?: boolean,
  mdEnd?: boolean,
  lgEnd?: boolean,
  xsTop?: boolean,
  smTop?: boolean,
  mdTop?: boolean,
  lgTop?: boolean,
  xsMiddle?: boolean,
  smMiddle?: boolean,
  mdMiddle?: boolean,
  lgMiddle?: boolean,
  xsBottom?: boolean,
  smBottom?: boolean,
  mdBottom?: boolean,
  lgBottom?: boolean,
  xsAround?: boolean,
  smAround?: boolean,
  mdAround?: boolean,
  lgAround?: boolean,
  xsBetween?: boolean,
  smBetween?: boolean,
  mdBetween?: boolean,
  lgBetween?: boolean,
};

const Row = (props: Props) => {
  const ComponentClass = props.componentClass;
  const {
    style,
    className,
    children,
    reverse,
    xsStart,
    smStart,
    mdStart,
    lgStart,
    xsCenter,
    smCenter,
    mdCenter,
    lgCenter,
    xsEnd,
    smEnd,
    mdEnd,
    lgEnd,
    xsTop,
    smTop,
    mdTop,
    lgTop,
    xsMiddle,
    smMiddle,
    mdMiddle,
    lgMiddle,
    xsBottom,
    smBottom,
    mdBottom,
    lgBottom,
    xsAround,
    smAround,
    mdAround,
    lgAround,
    xsBetween,
    smBetween,
    mdBetween,
    lgBetween,
  } = props;
  const classes = classNames(
    {
      grid__row: true,
      'grid__row--reverse': reverse,

      'grid__row--xs-start': xsStart,
      'grid__row--sm-start': smStart,
      'grid__row--md-start': mdStart,
      'grid__row--lg-start': lgStart,

      'grid__row--xs-center': xsCenter,
      'grid__row--sm-center': smCenter,
      'grid__row--md-center': mdCenter,
      'grid__row--lg-center': lgCenter,

      'grid__row--xs-end': xsEnd,
      'grid__row--sm-end': smEnd,
      'grid__row--md-end': mdEnd,
      'grid__row--lg-end': lgEnd,

      'grid__row--xs-top': xsTop,
      'grid__row--sm-top': smTop,
      'grid__row--md-top': mdTop,
      'grid__row--lg-top': lgTop,

      'grid__row--xs-middle': xsMiddle,
      'grid__row--sm-middle': smMiddle,
      'grid__row--md-middle': mdMiddle,
      'grid__row--lg-middle': lgMiddle,

      'grid__row--xs-bottom': xsBottom,
      'grid__row--sm-bottom': smBottom,
      'grid__row--md-bottom': mdBottom,
      'grid__row--lg-bottom': lgBottom,

      'grid__row--xs-around': xsAround,
      'grid__row--sm-around': smAround,
      'grid__row--md-around': mdAround,
      'grid__row--lg-around': lgAround,

      'grid__row--xs-between': xsBetween,
      'grid__row--sm-between': smBetween,
      'grid__row--md-between': mdBetween,
      'grid__row--lg-between': lgBetween,
    },
    className,
  );

  return (
    <ComponentClass className={classes} style={style}>
      {children}
    </ComponentClass>
  );
};

Row.defaultProps = {
  componentClass: 'div',
};

export default Row;
