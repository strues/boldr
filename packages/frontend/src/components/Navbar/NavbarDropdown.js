/* @flow */
import React from 'react';
import cn from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  isBoxed?: boolean,
  className?: string,
};

export function NavbarDropdown({ tag = 'div', isBoxed, ...props }: Props) {
  const className = cn(
    'boldr-navbar__dropdown',
    {
      'is-boxed': isBoxed,
    },
    props.className,
  );

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(NavbarDropdown);
