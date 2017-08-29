/* @flow */
import * as React from 'react';
import NavLink from 'react-router-dom/NavLink';
import { NavbarDropdown, NavbarItem, NavbarLink } from '@boldr/ui/Navbar';
import type { MenuDetailChildren } from '../../../../types/boldr';

export type Props = {
  isActive?: boolean,
  href?: string,
  title?: string,
  hasDropdown: boolean,
  children: MenuDetailChildren,
};

const NavItem = ({ isActive, href, children, title, hasDropdown }: Props) => {
  if (!hasDropdown) {
    return (
      <NavbarItem
        isActive={isActive}
        render={() =>
          <NavLink className="boldrui-navbar__item" activeClassName="is-active" to={href}>
            {title}
          </NavLink>}
      />
    );
  } else {
    return (
      <NavbarItem hasDropdown isHoverable>
        <NavbarLink
          isActive={isActive}
          className="boldrui-navbar__item"
          render={() =>
            <NavLink className="boldrui-navbar__link" to={href}>
              {title}
            </NavLink>}
        />
        <NavbarDropdown>
          {children.items.map(item =>
            <NavbarItem
              key={item.id}
              isActive={isActive}
              title={item.safeName}
              render={() =>
                <NavLink
                  className="boldrui-navbar__item"
                  activeClassName="is-active"
                  to={item.href}>
                  {item.safeName}
                </NavLink>}
            />,
          )}
        </NavbarDropdown>
      </NavbarItem>
    );
  }
};

export default NavItem;
