// @flow
import React from 'react';
import classNames from 'classnames';
import {
  removeColorProps,
  removeSizeProps,
  getColorModifiers,
  getSizeModifiers,
  withHelpersModifiers,
} from '../../core/util/boldrui';
import { combineModifiers, getHTMLProps } from '../../core/util/helpers';

export type Props = {
  tag?: string,
  className?: string,
  isBold?: boolean,
  isFullHeight?: boolean,
};

export function Hero({ tag = 'section', ...props }: Props) {
  const className = classNames(
    'boldrui-hero',
    {
      'is-bold': props.isBold,
      'is-fullheight': props.isFullHeight,
      'is-halfheight': props.isFullHeight,
      ...combineModifiers(props, getColorModifiers, getSizeModifiers),
    },
    props.className,
  );

  const { isBold, isFullHeight, ...rest } = props;

  const HTMLProps = getHTMLProps(rest, removeColorProps, removeSizeProps);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default withHelpersModifiers(Hero);
