/* @flow */
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { getActiveModifiers, removeActiveModifiers, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';

export type Props = {
  tag?: string,
  isTransparent?: boolean,
  className?: string,
  children: Array<Node>,
};
export function NavbarBurger({ tag = 'div', ...props }: Props) {
  const className = cn(
    'boldr-navbar__burger',
    {
      ...getActiveModifiers(props),
    },
    props.className,
  );

  const { children, ...HTMLProps } = getDomSafeProps(props, removeActiveModifiers);

  return React.createElement(
    tag,
    { ...HTMLProps, className },
    // $FlowIssue
    React.createElement('span', null),
    // $FlowIssue
    React.createElement('span', null),
    // $FlowIssue
    React.createElement('span', null),
  );
}

export default createWrappedComponent(NavbarBurger);
