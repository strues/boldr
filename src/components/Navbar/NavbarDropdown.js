/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import { createWrappedComponent } from '../../core/util/boldrui';

export type Props = {
  tag?: string,
  isBoxed?: boolean,
  className?: string,
};
const BASE_ELEMENT = StyleClasses.NAVBAR_DROPDOWN;
export function NavbarDropdown({ tag = 'div', isBoxed, ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      'is-boxed': isBoxed,
    },
    props.className,
  );

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(NavbarDropdown);
