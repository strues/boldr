/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  isFlexible?: boolean,
  className?: string,
  href?: string,
};
const BASE_ELEMENT = StyleClasses.LEVEL_ITEM;
export function LevelItem({ tag = 'div', ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      'is-flexible': props.isFlexible,
    },
    props.className,
  );

  const { ...HTMLProps } = props;

  return React.createElement(props.href ? 'a' : tag, { ...HTMLProps, className });
}

export default createWrappedComponent(LevelItem);
