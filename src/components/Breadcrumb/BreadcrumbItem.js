import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  /**
   * If set to true, renders `span` instead of `a`
   */
  active: PropTypes.bool,
  /**
   * `href` attribute for the inner `a` element
   */
  href: PropTypes.string,
  /**
   * `title` attribute for the inner `a` element
   */
  title: PropTypes.node,
  /**
   * `target` attribute for the inner `a` element
   */
  target: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  active: false,
  className: 'boldrui-breadcrumb__item',
};

const BreadcrumbItem = props => {
  const { active, href, title, target, className, ...rest } = props;

  // Don't try to render these props on non-active <span>.
  const linkProps = { href, title, target };

  return (
    <li className={classNames('boldrui-breadcrumb__item', { active })}>
      {active ? <span {...rest} /> : <SafeAnchor {...rest} {...linkProps} />}
    </li>
  );
};

BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
