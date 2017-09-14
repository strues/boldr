// @flow
import React from 'react';
import cn from 'classnames';
import {
  removeColorProps,
  removeSizeProps,
  getColorModifiers,
  getSizeModifiers,
  createWrappedComponent,
} from '../util/boldrui';
import { combineModifiers, getDomSafeProps } from '../util/helpers';

export type Props = {
  tag?: string,
  className?: string,
  isBold?: boolean,
  isFullHeight?: boolean,
  isHalfHeight?: boolean,
};

export function Hero({ tag = 'section', ...props }: Props) {
  const className = cn(
    'boldr-hero',
    {
      'is-bold': props.isBold,
      'is-fullheight': props.isFullHeight,
      'is-halfheight': props.isHalfHeight,
      ...combineModifiers(props, getColorModifiers, getSizeModifiers),
    },
    props.className,
  );

  const { ...rest } = props;

  const HTMLProps = getDomSafeProps(rest, removeColorProps, removeSizeProps);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(Hero);
