/* @flow */
import React from 'react';
import cn from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.LEVEL_LEFT;

export function LevelLeft({ tag = 'div', ...props }: Props) {
  const className = cn(BASE_ELEMENT, props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(LevelLeft);
