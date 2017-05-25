/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Chevron = props => (
  <i
    className={classNames('fa', props.className, {
      'fa-chevron-left': !props.expanded,
      'fa-chevron-down': props.expanded,
    })}
  />
);

Chevron.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
};

Chevron.defaultProps = {
  className: '',
  expanded: false,
};

export const FaIcon = props => (
  <i className={classNames('fa', props.className)} />
);

FaIcon.propTypes = {
  className: PropTypes.string,
};

FaIcon.defaultProps = {
  className: '',
};

export const createItemTree = (input, level = 0) =>
  input.map(
    item =>
      (item.items
        ? {
            expanded: false,
            active: false,
            level,
            ...item,
            items: createItemTree(item.items, level + 1),
          }
        : {
            expanded: false,
            active: false,
            level,
            ...item,
          }),
  );

export const collapseTree = items =>
  items.map(
    item =>
      (item.items
        ? {
            ...item,
            expanded: false,
            items: collapseTree(item.items),
          }
        : {
            ...item,
            expanded: false,
          }),
  );

export const deactivateTree = items =>
  items.map(
    item =>
      (item.items
        ? {
            ...item,
            active: false,
            items: deactivateTree(item.items),
          }
        : {
            ...item,
            active: false,
          }),
  );

const expandParent = parentItem => () => {
  parentItem.expanded = true;
};

const activateParent = parentItem => () => {
  parentItem.active = true;
};

const switchItem = (activate, items, id, link = null, switchParentFn = null) =>
  items.map(item => {
    const newItem = { ...item };

    if (
      (id && newItem.id === id) ||
      (!id && newItem.link && newItem.link === link)
    ) {
      // This item is to be toggled or activated
      if (!activate) newItem.expanded = !newItem.expanded;
      if (activate) newItem.active = true;

      // Collapse / deactivate all children, if it has any (e.g. "clean-up")
      if (!activate && newItem.items)
        newItem.items = collapseTree(newItem.items);
      if (activate && newItem.items)
        newItem.items = deactivateTree(newItem.items);

      // Activate / expand the parent
      if (switchParentFn) switchParentFn();
    } else {
      // Not this item, so collapse / deactivate it and process its children if it has any
      if (!activate) newItem.expanded = false;
      if (activate) newItem.active = false;
      if (newItem.items) {
        newItem.items = activate
          ? switchItem(true, newItem.items, id, link, activateParent(newItem))
          : switchItem(false, newItem.items, id, link, expandParent(newItem));
      }

      // If the child was the targeted item, it expanded / activate the parent -> Pass up along the tree
      if (!activate && newItem.expanded && switchParentFn) switchParentFn();
      if (activate && newItem.active && switchParentFn) switchParentFn();
    }

    return newItem;
  });

export const toggleExpandedItemWithId = (id, items) =>
  switchItem(false, items, id);
export const toggleExpandedItemWithLink = (link, items) =>
  switchItem(false, items, null, link);

export const activateItemWithId = (id, items) => switchItem(true, items, id);

export const activateItemWithLink = (link, items) =>
  switchItem(true, items, null, link);
