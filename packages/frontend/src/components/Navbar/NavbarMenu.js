/* @flow */
import React from 'react';
import classNames from 'classnames';
import { getActiveModifiers, removeActiveModifiers, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';

export type Props = {
  tag?: string,
  className?: string,
};

export function NavbarMenu({ tag = 'div', ...props }: Props) {
  const className = classNames(
    'boldr-navbar__menu',
    {
      ...getActiveModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeActiveModifiers);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(NavbarMenu);
