// @flow
import React from 'react';
import classNames from 'classnames';
import { getActiveModifiers, removeActiveModifiers, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';

export type Props = {
  tag?: string,
  isHoverable?: boolean,
  hasDropdown?: boolean,
  render?: Function,
  title?: string,
  className?: string,
};

export function NavbarItem({ tag = 'div', render, isHoverable, hasDropdown, ...props }: Props) {
  const className = classNames(
    'boldr-navbar__item',
    {
      'is-hoverable': isHoverable,
      'has-dropdown': hasDropdown,
      ...getActiveModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeActiveModifiers);

  if (render) {
    return render({ ...HTMLProps, className });
  }

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(NavbarItem);
