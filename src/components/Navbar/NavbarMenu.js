/* @flow */
import React from 'react';
import classNames from 'classnames';
import {
  getActiveModifiers,
  removeActiveModifiers,
  createWrappedComponent,
} from '../../core/util/boldrui';
import { StyleClasses } from '../../theme/styleClasses';
import { getDomSafeProps } from '../../core/util/helpers';

export type Props = {
  tag?: string,
  className?: string,
};
const BASE_ELEMENT = StyleClasses.NAVBAR_MENU;
export function NavbarMenu({ tag = 'div', ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getActiveModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeActiveModifiers);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(NavbarMenu);
