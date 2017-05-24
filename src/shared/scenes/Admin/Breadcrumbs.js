import React from 'react';
import matchPath from 'react-router-dom/matchPath';
import Breadcrumb from '../../components/Breadcrumb';
import LinkContainer from '../../components/LinkContainer';
import View from '../../components/View';
import rootRoutes from './routes';

const generatePathname = (path, params) =>
  Object.keys(params).reduce(
    (pathname, key) => pathname.replace(`:${key}`, params[key]),
    path,
  );

const generateBreadcrumbs = (accum, topRoutes, location) => {
  topRoutes.some(({ path, breadcrumb, routes }) => {
    const matches = matchPath(location.pathname, path);
    if (matches) {
      accum.push({
        breadcrumb,
        pathname: generatePathname(path, matches.params),
      });
      generateBreadcrumbs(accum, routes, location);
    }
    return !!matches;
  });
  return accum;
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
        {generatedBreadcrumbs.map(({ breadcrumb, pathname }, index) => (
          <LinkContainer to={pathname} key={pathname}>
            <Breadcrumb.Item active={generatedBreadcrumbs.length - 1 === index}>
              {breadcrumb}
            </Breadcrumb.Item>
          </LinkContainer>
        ))}
      </Breadcrumb>
    </View>
  );
};

export default Breadcrumbs;
