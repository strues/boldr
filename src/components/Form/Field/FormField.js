// @flow
import React from 'react';
import classNames from 'classnames';

import { isRight, isCentered, isFullWidth, createWrappedComponent } from '../../../core/util/boldrui';

import { isOption } from '../../../core/util/helpers';
import { StyleClasses } from '../../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.FORM_FIELD;

export type Directions = 'right' | 'centered';

export type props = {
  isGrouped?: boolean | Directions,
  hasAddons?: boolean | Directions | 'fullwidth',
  isHorizontal?: boolean,
};

const getModifier = (
  modifier: boolean | Directions | 'fullwidth',
  helper: string,
  isDirection: Function,
): object => {
  if (modifier === true) {
    return { [`${helper}`]: true };
  } else if (typeof modifier === 'string') {
    return isDirection(modifier) ? { [`${helper} ${helper}-${modifier}`]: true } : {};
  }

  return {};
};

export function FormField({ tag = 'div', ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getModifier(props.isGrouped, 'is-grouped', isOption(isRight, isCentered)),
      ...getModifier(props.hasAddons, 'has-addons', isOption(isRight, isCentered, isFullWidth)),
      'is-horizontal': props.isHorizontal,
    },
    props.className,
  );
  const { isGrouped, hasAddons, isHorizontal, ...HTMLProps } = props;

  return React.createElement(tag, { ...HTMLProps, className });
}
export default createWrappedComponent(FormField);
