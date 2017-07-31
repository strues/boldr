/* @flow */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';

import { StyleClasses, Anchor } from '@boldr/ui';
import { Chevron } from './SidebarUtils';

const PARENT_ELEMENT = StyleClasses.SIDEBAR_NAV;
const BASE_ELEMENT = StyleClasses.SIDEBAR_NAV_ITEM;

export type Props = {
  label: string,
  onExpandCollapse?: () => void,
  icon: string,
  active: boolean,
  expanded: boolean,
};

const SidebarNavTitle = (props: Props) => {
  return (
    <div className={classnames(`${BASE_ELEMENT}-title`)} onClick={props.onExpandCollapse}>
      {props.icon
        ? <Icon
            color="#f1f1f1"
            size="20px"
            className={classnames(`${PARENT_ELEMENT}-icon`)}
            kind={props.icon}
          />
        : null}
      {props.label}
      <Chevron
        expanded={props.expanded || props.active}
        className={classnames(`${PARENT_ELEMENT}-chevron`)}
      />
    </div>
  );
};

export type SidebarNavLinkProps = {
  active: boolean,
  level: number,
  link: string,
  icon: ?string,
  label: string,
};

const SidebarNavLink = (props: SidebarNavLinkProps) => {
  return (
    <div
      className={classnames(BASE_ELEMENT, `level-${props.level}`, {
        active: props.active,
      })}
    >
      <Anchor
        to={props.link}
        label={props.label}
        icon={props.icon ? props.icon : null}
        iconColor="#f1f1f1"
        iconSize="20px"
        className={`${BASE_ELEMENT}-link`}
      />
    </div>
  );
};

const SidebarNavSubNav = (props: SidebarNavItemProps) => {
  return (
    <div
      className={classnames(BASE_ELEMENT, `level-${props.level}`, {
        collapsed: !props.expanded,
        expanded: props.expanded,
        active: props.active,
      })}
    >
      <SidebarNavTitle {...props} />
      <div className={classnames(`${BASE_ELEMENT}-children`)}>
        {props.items && Array.isArray(props.items)
          ? props.items.map(item =>
              <SidebarNavItem
                key={item.id}
                level={props.level + 1}
                onItemClick={props.onItemClick}
                expanded={props.expanded}
                {...item}
              />,
            )
          : null}
      </div>
    </div>
  );
};

const SidebarNavItem = (props: SidebarNavItemProps) => {
  return (
    // If the item has a link, its a single item
    // without a link, it has child items and is a sub menu
    props.link ? <SidebarNavLink {...props} /> : <SidebarNavSubNav {...props} />
  );
};
SidebarNavItem.defaultProps = {
  link: null,
  icon: null,
  items: null,
};

export default SidebarNavItem;
