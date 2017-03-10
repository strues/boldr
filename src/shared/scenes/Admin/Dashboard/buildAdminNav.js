/* eslint-disable max-statements */
import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';
import { toTitle, flatten } from 'boldr-utils';
import adminRoutes from './adminRoutes';

function mapToNavItems(route, parents = []) {
  const prefix = `${parents.length ? '/' : ''}${parents.join('/')}/`;
  if (typeof route === 'string') {
    return {
      component: IndexLink,
      key: route,
      to: `${prefix}${route}`,
      className: 'md-text-capitalize',
      primaryText: toTitle(route),
    };
  }

  const {
    divider,
    subheader,
    path,
    primaryText,
    icon,
    avatarProps,
    nestedItems,
    component,
    ...props
  } = route;

  if (divider) {
    return { divider, key: 'divider', ...props };
  } else if (subheader) {
    return {
      primaryText,
      subheader,
      key: primaryText,
      ...props,
    };
  }

  let resolvedNestedItems,
    resolvedIcon,
    resolvedComponent,
    to,
    key;

  if (nestedItems) {
    resolvedNestedItems = nestedItems.map(route => mapToNavItems(route, parents.length ? [...parents, path] : [path]));
  }

  if (icon) {
    resolvedIcon = <FontIcon>{icon}</FontIcon>;
  }

  if (avatarProps) {
    resolvedIcon = <Avatar { ...avatarProps } className="md-avatar md-avatar--icon-sized md-avatar--svg" />;
  }

  if (path === '') {
    resolvedComponent = IndexLink;
  } else if (component) {
    resolvedComponent = component;
  } else if (props.href) {
    resolvedComponent = 'a';
  } else if (!nestedItems) {
    resolvedComponent = Link;
  }

  if (typeof path !== 'undefined' && !nestedItems) {
    to = `${prefix}${path}`;
    key = path;
  } else {
    key = primaryText;
  }

  return {
    ...props,
    key,
    to,
    component: resolvedComponent,
    leftIcon: resolvedIcon,
    nestedItems: resolvedNestedItems,
    primaryText: primaryText || toTitle(path),
  };
}

const routes = adminRoutes.map(route => mapToNavItems(route));

function isNestedActive(nestedItems, pathname) {
  return nestedItems &&
  nestedItems.some(({ to, nestedItems }) => to === pathname || isNestedActive(nestedItems, pathname));
}

function updateActiveRoutes(route, pathname) {
  if (route.divider || route.subheader) {
    return route;
  }

  const { to, nestedItems, ...props } = route;
  const active = to === pathname || isNestedActive(nestedItems, pathname);
  return {
    ...props,
    to,
    active,
    defaultOpen: nestedItems && active,
    nestedItems: nestedItems && nestedItems.map(route => updateActiveRoutes(route, pathname)),
  };
}

export default function getNavItems(pathname = '') {
  if (!pathname || pathname === '') {
    return routes;
  }

  return routes.map(route => updateActiveRoutes(route, pathname));
}

function extractRealRoutes(route) {
  if (route.nestedItems) {
    return route.nestedItems.map(extractRealRoutes);
  } else if (route.to && route.to !== '/') {
    const { primaryText, to } = route;
    return { primaryText, to };
  }

  return null;
}
