/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import { withHelpersModifiers } from '../../core/util/boldrui';

export type Props = {
  tag?: string,
  isBoxed?: boolean,
  className?: string,
};
const BASE_ELEMENT = StyleClasses.NAVBAR_DIVIDER;

export function NavbarDivider({ tag = 'hr', isBoxed, ...props }: Props) {
  const className = classNames(BASE_ELEMENT, props.className);

  return React.createElement(tag, { ...props, className });
}

export default withHelpersModifiers(NavbarDivider);
