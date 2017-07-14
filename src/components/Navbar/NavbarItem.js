/* @flow */
import React from 'react';
import classNames from 'classnames';
import NavLink from 'react-router-dom/NavLink';
import { StyleClasses } from '../../theme/styleClasses';
import {
  getActiveModifiers,
  removeActiveModifiers,
  withHelpersModifiers,
} from '../../core/util/boldrui';
import { getHTMLProps, combineModifiers } from '../../core/util/helpers';

export type Props = {
  tag?: string,
  isHoverable?: boolean,
  hasDropdown?: boolean,
  render?: Function,
  title?: string,
  className?: string,
  href?: string,
};

const BASE_ELEMENT = StyleClasses.NAVBAR_ITEM;
export function NavbarItem({ tag = 'div', render, isHoverable, hasDropdown, ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      'is-hoverable': isHoverable,
      'has-dropdown': hasDropdown,
      ...getActiveModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getHTMLProps(props, removeActiveModifiers);

  if (render) {
    return render({ ...HTMLProps, className });
  }
  if (props.href) {
    return (
      <NavLink className={className} to={props.href} {...HTMLProps}>
        {props.title}
      </NavLink>
    );
  }
  return React.createElement(tag, { ...HTMLProps, className });
}

export default withHelpersModifiers(NavbarItem);
