/* @flow */
import React from 'react';
import classNames from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  isBoxed?: boolean,
  className?: string,
};

export function NavbarEnd({ tag = 'div', ...props }: Props) {
  const className = classNames('boldr-navbar__end', props.className);

  return React.createElement(tag, { ...props, className });
}

const HOC = createWrappedComponent(NavbarEnd);
export default HOC;
