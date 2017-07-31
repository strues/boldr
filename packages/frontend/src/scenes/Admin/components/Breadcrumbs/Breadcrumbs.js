/* @flow */
import React from 'react';
import matchPath from 'react-router-dom/matchPath';
// internal
import Breadcrumb from '@boldr/ui/Breadcrumb';
import LinkContainer from '@boldr/ui/LinkContainer';
import View from '@boldr/ui/View';
import rootRoutes from '../../routes';

const generatePathname = (path, params) => {
  return Object.keys(params).reduce(
    (pathname, key) => pathname.replace(`:${key}`, params[key]),
    path,
  );
};

const generateBreadcrumbs = (acc, topRoutes, location) => {
  topRoutes.some(({ path, breadcrumb, routes }) => {
    const matches = matchPath(location.pathname, path);
    if (matches) {
      acc.push({
        breadcrumb,
        pathname: generatePathname(path, matches.params),
      });
      generateBreadcrumbs(acc, routes, location);
    }
    return matches;
  });
  return acc;
};

const Breadcrumbs = ({ location }: { location: Location }) => {
  const crumbs = generateBreadcrumbs([], rootRoutes, location);
  return (
    <View
      style={{
        display: crumbs.length < 2 ? 'none' : 'inherit',
        visibility: crumbs.length < 2 ? 'hidden' : 'inherit',
      }}
    >
      <Breadcrumb>
        {crumbs.map(({ breadcrumb, pathname }, index) =>
          <LinkContainer to={pathname} key={pathname}>
            <Breadcrumb.Item active={crumbs.length - 1 === index}>
              {breadcrumb}
            </Breadcrumb.Item>
          </LinkContainer>,
        )}
      </Breadcrumb>
    </View>
  );
};

export default Breadcrumbs;
