/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@boldr/ui/Icons/Icon';

export const Chevron = props => {
  const iconKind = props.expanded ? 'chevron-down' : 'chevron-left';
  return <Icon className={props.className} color="#fff" kind={iconKind} />;
};

Chevron.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
};

Chevron.defaultProps = {
  className: '',
  expanded: false,
};

export const createItemTree = (input, level = 0) =>
  input.map(
    item =>
      // Content
      // --- Articles
      // ---- New Article
      item.items
        ? {
            isExpanded: false,
            isActive: false,
            level,
            ...item,
            // create the sub menu
            items: createItemTree(item.items, level + 1),
          }
        : {
            // here we dont have child items
            isExpanded: false,
            isActive: false,
            level,
            ...item,
          },
  );

export const collapseTree = items =>
  items.map(
    item =>
      item.items
        ? {
            ...item,
            isExpanded: false,
            items: collapseTree(item.items),
          }
        : {
            ...item,
            isExpanded: false,
          },
  );

export const deactivateTree = items =>
  items.map(
    item =>
      item.items
        ? {
            ...item,
            isActive: false,
            items: deactivateTree(item.items),
          }
        : {
            ...item,
            isActive: false,
          },
  );

const expandParent = parentItem => () => {
  parentItem.isExpanded = true;
};

const activateParent = parentItem => () => {
  parentItem.isActive = true;
};

const switchItem = (activate, items, id, link = null, switchParentFn = null) =>
  items.map(item => {
    const newItem = { ...item };

    if ((id && newItem.id === id) || (!id && newItem.link && newItem.link === link)) {
      // This item is to be toggled or activated
      if (!activate) {
        newItem.isExpanded = !newItem.isExpanded;
      }
      if (activate) {
        newItem.isActive = true;
      }

      // Collapse / deactivate all children, if it has any (e.g. "clean-up")
      if (!activate && newItem.items) {
        newItem.items = collapseTree(newItem.items);
      }

      if (activate && newItem.items) {
        newItem.items = deactivateTree(newItem.items);
      }

      // Activate / expand the parent
      if (switchParentFn) {
        switchParentFn();
      }
    } else {
      // Not this item, so collapse / deactivate it and process its children if it has any
      if (!activate) {
        newItem.isExpanded = false;
      }
      if (activate) {
        newItem.isActive = false;
      }
      if (newItem.items) {
        newItem.items = isActive
          ? switchItem(true, newItem.items, id, link, activateParent(newItem))
          : switchItem(false, newItem.items, id, link, expandParent(newItem));
      }

      // If the child was the targeted item, it expanded / activate the parent -> Pass up along the tree
      if (!isActive && newItem.isExpanded && switchParentFn) {
        switchParentFn();
      }
      if (isActive && newItem.isActive && switchParentFn) {
        switchParentFn();
      }
    }

    return newItem;
  });

export const toggleExpandedItemWithId = (id, items) => switchItem(false, items, id);
export const toggleExpandedItemWithLink = (link, items) => switchItem(false, items, null, link);

export const activateItemWithId = (id, items) => switchItem(true, items, id);

export const activateItemWithLink = (link, items) => switchItem(true, items, null, link);
