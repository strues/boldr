// @flow
import React from 'react';
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import type { ReactChildren } from '../../../types/react.js.flow';

export type Props = {
  className?: string,
  style?: Object,
  children: ReactChildren,
  xs?: number | boolean,
  sm?: number | boolean,
  md?: number | boolean,
  lg?: number | boolean,
  xsOffset?: number,
  smOffset?: number,
  mdOffset?: number,
  lgOffset?: number,
  reverse?: boolean,
  xsFirst?: boolean,
  smFirst?: boolean,
  mdFirst?: boolean,
  lgFirst?: boolean,
  xsLast?: boolean,
  smLast?: boolean,
  mdLast?: boolean,
  lgLast?: boolean,
  componentClass: string,
};

const Col = (props: Props) => {
  const ComponentClass = props.componentClass;
  const {
    className,
    style,
    children,
    reverse,
    xs,
    sm,
    md,
    lg,
    xsOffset,
    smOffset,
    mdOffset,
    lgOffset,
    xsFirst,
    smFirst,
    mdFirst,
    lgFirst,
    xsLast,
    smLast,
    mdLast,
    lgLast,
  } = props;
  const classes = classNames(
    {
      [`grid__col--xs${isNumber(xs) ? `-${xs}` : ''}`]: xs >= 0,
      [`grid__col--sm${isNumber(sm) ? `-${sm}` : ''}`]: sm >= 0,
      [`grid__col--md${isNumber(md) ? `-${md}` : ''}`]: md >= 0,
      [`grid__col--lg${isNumber(lg) ? `-${lg}` : ''}`]: lg >= 0,

      [`grid__col--xs-offset-${xsOffset}`]: xsOffset >= 0,
      [`grid__col--sm-offset-${smOffset}`]: smOffset >= 0,
      [`grid__col--md-offset-${mdOffset}`]: mdOffset >= 0,
      [`grid__col--lg-offset-${lgOffset}`]: lgOffset >= 0,

      'grid__col--reverse': reverse,

      'grid__col--xs-first': xsFirst,
      'grid__col--sm-first': smFirst,
      'grid__col--md-first': mdFirst,
      'grid__col--lg-first': lgFirst,

      'grid__col--xs-last': xsLast,
      'grid__col--sm-last': smLast,
      'grid__col--md-last': mdLast,
      'grid__col--lg-last': lgLast,
    },
    className,
  );

  return (
    <ComponentClass className={classes} style={style}>
      {children}
    </ComponentClass>
  );
};

Col.defaultProps = {
  componentClass: 'div',
};

export default Col;
