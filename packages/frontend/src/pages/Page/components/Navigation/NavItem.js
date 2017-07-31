/* @flow */
import React from 'react';
import { NavbarDropdown, NavbarItem, NavbarLink } from '@boldr/ui/Navbar';

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

const NavItem = ({ isActive, href, children, title, safeName, icon, hasDropdown }: Props) => {
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
