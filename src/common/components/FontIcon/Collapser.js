export type Props = {
  className?: string,
  iconClassName?: string,
  children?: number | string | React.Element | Array<any>,
  flipped?: boolean,
  suffix?: string,
  suffixFlipped?: boolean,
};

import React, { PropTypes } from 'react';
import cn from 'classnames';
import FontIcon from './FontIcon';

const Collapser = ({ className, flipped, suffix, suffixFlipped, ...props }) => (
  <FontIcon
    key="collapser"
    { ...props }
    className={ cn('md-collapser', {
      'md-collapser--flipped': flipped && (!suffixFlipped || !suffix),
      [`md-collapser--${suffix}`]: suffix,
      [`md-collapser--${suffix}-flipped`]: suffix && flipped && suffixFlipped,
    }, className) }
  />
);

Collapser.defaultProps = {
  children: 'keyboard_arrow_down',
};

export default Collapser;
