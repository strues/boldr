/* @flow */
import React from 'react';
import classNames from 'classnames';
import { getActiveModifiers, removeActiveModifiers, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';

export type Props = {
  tag?: string,
  isHoverable?: boolean,
  hasDropdown?: boolean,
  render?: Function,
  className?: string,
  href?: string,
};

export function NavbarLink({ tag = 'a', render, ...props }: Props) {
  const className = classNames(
    'boldr-navbar__link',
    {
      ...getActiveModifiers(props),
    },
    props.className,
  );

  if (render) {
    return render({ ...props, className });
  }

  const HTMLProps = getDomSafeProps(props, removeActiveModifiers);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(NavbarLink);
