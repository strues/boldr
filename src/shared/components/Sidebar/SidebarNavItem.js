/* eslint-disable  jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import type { ReactChildren, ReactElement } from '../../types/react.js.flow';
import { StyleClasses, BOLDR_NS } from '../../theme/styleClasses';
import Anchor from '../Anchor';
import type { SidebarLink, SidebarLinks } from './Sidebar';
import { Chevron, FaIcon } from './SidebarUtils';

const PARENT_ELEMENT = StyleClasses.SIDEBAR_NAV;
const BASE_ELEMENT = StyleClasses.SIDEBAR_NAV_ITEM;

type SidebarNavItemProps = {
  label: string,
  id: string | number,
  onItemClick: () => void,
  onSubItemClick: () => void,
  level: number,
  link: string,
  icon: string,
  active: boolean,
  expanded: boolean,
  items: SidebarLinks,
};

const SidebarNavItem = (props: SidebarNavItemProps) =>
  // if item has a link as its direct props it must be a link. We render
  // and move on. Imagine that.
  (props.link
    ? <div
        className={classnames(BASE_ELEMENT, `level-${props.level}`, {
          active: props.active,
        })}
      >
        <Anchor
          to={props.link}
          label={props.label}
          icon={props.icon ? `${props.icon} ${PARENT_ELEMENT}-icon` : null}
          className={`${BASE_ELEMENT}-link`}
        />
      </div>
    : <div
        className={classnames(BASE_ELEMENT, `level-${props.level}`, {
          collapsed: !props.expanded,
          expanded: props.expanded,
          active: props.active,
        })}
        onClick={props.onItemClick(props.id, props.items)}
      >
        <div className={classnames(`${BASE_ELEMENT}-title`)}>
          {/* if theres an icon we're going to render it */}
          {props.icon
            ? <FaIcon
                className={classnames(`${PARENT_ELEMENT}-icon`, props.icon)}
              />
            : null}
          {props.label}
          {/* if theres a chevron we're going to render it */}
          <Chevron
            expanded={props.expanded || props.active}
            className={classnames(`${PARENT_ELEMENT}-chevron`)}
          />
        </div>
        {/* since we are down here, we have nested links within item.items[] */}
        <div className={classnames(`${BASE_ELEMENT}-children`)}>
          {props.items && Array.isArray(props.items)
            ? props.items.map(item => (
                <SidebarNavItem
                  key={item.id}
                  level={props.level + 1}
                  onItemClick={props.onItemClick}
                  expanded={props.expanded}
                  {...item}
                />
              ))
            : null}
        </div>
      </div>);

SidebarNavItem.defaultProps = {
  link: null,
  icon: null,
  items: null,
};

export default SidebarNavItem;
