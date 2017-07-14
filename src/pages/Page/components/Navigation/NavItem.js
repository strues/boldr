/* @flow */
import React from 'react';
import Icon from '@boldr/ui/Icons/Icon';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';
import {
  NavbarDivider,
  NavbarDropdown,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
} from '../../../../components/Navbar';
// internal

export type Props = {
  isActive?: boolean,
  href?: string,
  icon?: string,
  title?: string,
  safeName?: string,
  location: Object,
  hasDropdown: boolean,
  children: Array<Object>,
  cssClassname?: string,
};

const NavItem = ({
  isActive,
  href,
  cssClassname,
  children,
  title,
  safeName,
  icon,
  hasDropdown,
}: Props) => {
  if (!hasDropdown) {
    return (
      <NavbarItem isActive={isActive} href={href} title={title}>
        {title}
      </NavbarItem>
    );
  } else {
    return (
      <NavbarItem hasDropdown isHoverable>
        <NavbarLink isActive={isActive} href={href} className="boldrui-navbar__item">
          {title}
        </NavbarLink>
        <NavbarDropdown>
          {children.items.map(item =>
            <NavbarItem key={item.id} href={item.href} title={item.safeName}>
              {item.safeName}
            </NavbarItem>,
          )}
        </NavbarDropdown>
      </NavbarItem>
    );
  }
};

export default NavItem;
