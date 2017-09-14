/* @flow */
import React from 'react';
import classNames from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};
export function NavbarStart({ tag = 'div', ...props }: Props) {
  const className = classNames('boldr-navbar__start', props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(NavbarStart);
