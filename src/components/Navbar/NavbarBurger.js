/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import {
  getActiveModifiers,
  removeActiveModifiers,
  createWrappedComponent,
} from '../UiHelpers/boldrui';
import { getDomSafeProps } from '../UiHelpers/helpers';

export type Props = {
  tag?: string,
  isTransparent?: boolean,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.NAVBAR_BURGER;
export function NavbarBurger({ tag = 'div', ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getActiveModifiers(props),
    },
    props.className,
  );

  const { children, ...HTMLProps } = getDomSafeProps(props, removeActiveModifiers);

  return React.createElement(
    tag,
    { ...HTMLProps, className },
    React.createElement('span', null),
    React.createElement('span', null),
    React.createElement('span', null),
  );
}

export default createWrappedComponent(NavbarBurger);
