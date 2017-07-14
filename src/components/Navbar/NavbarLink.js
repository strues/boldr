/* @flow */
import React from 'react';
import classNames from 'classnames';
import {
  getActiveModifiers,
  removeActiveModifiers,
  withHelpersModifiers,
} from '../../core/util/boldrui';
import { getHTMLProps, combineModifiers } from '../../core/util/helpers';
import { StyleClasses } from '../../theme/styleClasses';

export type Props = {
  tag?: string,
  isHoverable?: boolean,
  hasDropdown?: boolean,
  render?: Function,
  className?: string,
  href?: string,
};
const BASE_ELEMENT = StyleClasses.NAVBAR_LINK;
export function NavbarLink({ tag = 'a', render, ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getActiveModifiers(props),
    },
    props.className,
  );

  if (render) {
    return render({ ...props, className });
  }

  const HTMLProps = getHTMLProps(props, removeActiveModifiers);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default withHelpersModifiers(NavbarLink);
