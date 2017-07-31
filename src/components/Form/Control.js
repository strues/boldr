// @flow
import React from 'react';
import classNames from 'classnames';

import {
  getLoadingModifiers,
  removeLoadingProps,
  isLeft,
  isRight,
  createWrappedComponent,
} from '../UiHelpers/boldrui';

import { is, isOption, getDomSafeProps } from '../UiHelpers/helpers';
import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.FORM_CONTROL;
export type Directions = 'left' | 'right';

export type Props = {
  hasIcons?: boolean,
  isExpanded?: boolean,
  tag?: string,
  className?: string,
};

const isDirection = isOption(isLeft, isRight);

const getModifier = modifier => {
  if (modifier === true) {
    return { 'has-icons-left has-icons-right': true };
  } else if (typeof modifier === 'string') {
    return isDirection(modifier) ? { [`has-icons-${modifier}`]: true } : {};
  } else if (Array.isArray(modifier)) {
    return modifier
      .map(str => str.toLowerCase().trim())
      .reduce(
        (init, option) => (isDirection(option) ? { ...init, [`has-icons-${option}`]: true } : init),
        {},
      );
  }

  return {};
};

export function Control({ tag = 'div', ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getModifier(props.hasIcons),
      'is-expanded': props.isExpanded,
      ...getLoadingModifiers(props),
    },
    props.className,
  );
  const { hasIcons, isExpanded, ...rest } = props;

  const HTMLProps = getDomSafeProps(rest, removeLoadingProps);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(Control);
