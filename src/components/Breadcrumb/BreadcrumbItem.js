/* @flow */
import React from 'react';
import cx from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import SafeAnchor from './SafeAnchor';

const BASE_ELEMENT = StyleClasses.BREADCRUMB_ITEM;

export type Props = {
  /**
   * If set to true, renders `span` instead of `a`
   */
  active?: boolean,
  /**
   * `href` attribute for the inner `a` element
   */
  href?: string,
  /**
   * `title` attribute for the inner `a` element
   */
  title?: string,
  /**
   * `target` attribute for the inner `a` element
   */
  target?: string,
  className?: string,
};
const defaultProps = {
  active: false,
};

const BreadcrumbItem = (props: Props) => {
  const { active, href, title, target, className, ...rest } = props;

  // Don't try to render these props on non-active <span>.
  const linkProps = { href, title, target };
  const classes = cx(BASE_ELEMENT, className);
  return (
    <li className={classes}>
      {active ? <span {...rest} /> : <SafeAnchor {...rest} {...linkProps} />}
    </li>
  );
};

BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
