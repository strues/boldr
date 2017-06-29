/* @flow */
import React from 'react';
import matchPath from 'react-router-dom/matchPath';
// internal
import Breadcrumb from '../../components/Breadcrumb';
import LinkContainer from '../../components/LinkContainer';
import View from '../../components/View';
import rootRoutes from './routes';

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
    return !!matches;
  });
  return acc;
};

const Breadcrumbs = ({ location }: { location: Location }) => {
  const generatedBreadcrumbs = generateBreadcrumbs([], rootRoutes, location);
  return (
    <View
      style={{
        visibility: generatedBreadcrumbs.length < 2 ? 'hidden' : 'inherit',
      }}
    >
      <Breadcrumb>
        {generatedBreadcrumbs.map(({ breadcrumb, pathname }, index) =>
          <LinkContainer to={pathname} key={pathname}>
            <Breadcrumb.Item active={generatedBreadcrumbs.length - 1 === index}>
              {breadcrumb}
            </Breadcrumb.Item>
          </LinkContainer>,
        )}
      </Breadcrumb>
    </View>
  );
};

export default Breadcrumbs;
