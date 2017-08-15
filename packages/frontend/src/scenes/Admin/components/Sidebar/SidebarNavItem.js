/* @flow */
/* eslint-disable  jsx-a11y/no-static-element-interactions, react/no-unused-prop-types */
import React from 'react';
import classnames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';

import { StyleClasses, Anchor } from '@boldr/ui';
import { Chevron } from './SidebarUtils';

const PARENT_ELEMENT = StyleClasses.SIDEBAR_NAV;
const BASE_ELEMENT = StyleClasses.SIDEBAR_NAV_ITEM;

export type Props = {
  isExpanded: boolean,
  link: ?string,
  isSmall: boolean,
  isActive: boolean,
  level: string,
  items: Array<Object>,
  onItemClick: ?Function,
  onExpandCollapse: ?Function,
  icon: ?string,
  label: ?string,
};

const SidebarNavLink = (props: Props) => {
  return (
    <div
      className={classnames(BASE_ELEMENT, `level-${props.level}`, {
        'is-small': props.isSmall,
        active: props.isActive,
      })}
    >
      <Anchor
        to={props.link}
        label={!props.isSmall ? props.label : null}
        icon={props.icon ? props.icon : null}
        iconColor="#f1f1f1"
        iconSize="20px"
        className={`${BASE_ELEMENT}-link`}
      />
    </div>
  );
};
type SidebarNavItemProps = {
  isExpanded: boolean,
  link: ?string,
  isActive: boolean,
  isSmall: boolean,
  level: string,
  items: Array<Object>,
  onItemClick: ?Function,
  onExpandCollapse: ?Function,
  icon: ?string,
  label: ?string,
};
const SidebarNavSubNav = (props: Props) => {
  return (
    <div
      className={classnames(BASE_ELEMENT, `level-${props.level}`, {
        collapsed: !props.isExpanded,
        isExpanded: props.isExpanded,
        active: props.isActive,
      })}
    >
      <div className={classnames(`${BASE_ELEMENT}-title`)} onClick={props.onExpandCollapse}>
        {props.icon
          ? <Icon
              color="#f1f1f1"
              size="20px"
              className={classnames(`${PARENT_ELEMENT}-icon`)}
              kind={props.icon}
            />
          : null}
        {!props.isSmall ? props.label : null}
        <Chevron
          expanded={props.isExpanded || props.isActive}
          className={classnames(`${PARENT_ELEMENT}-chevron`, { 'is-small': props.isSmall })}
        />
      </div>
      <div className={classnames(`${BASE_ELEMENT}-children`)}>
        {props.items && Array.isArray(props.items)
          ? props.items.map(item =>
              <SidebarNavItem
                key={item.id}
                level={props.level + 1}
                isSmall={props.isSmall}
                onItemClick={props.onItemClick}
                isExpanded={props.isExpanded}
                {...item}
              />,
            )
          : null}
      </div>
    </div>
  );
};

const SidebarNavItem = (props: Props) => {
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
