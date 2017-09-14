/* @flow */
import React from 'react';
import classNames from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  isTransparent?: boolean,
  className?: string,
};

export function NavbarBrand({ tag = 'div', ...props }: Props) {
  const className = classNames('boldr-navbar__brand', props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(NavbarBrand);
