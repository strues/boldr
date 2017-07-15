/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import { withHelpersModifiers } from '../../core/util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.LEVEL_LEFT;

export function LevelLeft({ tag = 'div', ...props }: Props) {
  const className = classNames(BASE_ELEMENT, props.className);

  return React.createElement(tag, { ...props, className });
}

export default withHelpersModifiers(LevelLeft);
