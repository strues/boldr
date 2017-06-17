/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import flatMapDeep from 'lodash/flatMapDeep';
import AnimatedRouter from '~components/AnimatedRouter';
import routes from './routes';

type Props = {
  path: string,
};

const flattenRoutes = topRoutes =>
  flatMapDeep(topRoutes, ({ routes: nestedRoutes, ...other }) => [
    other,
    ...flattenRoutes(nestedRoutes),
  ]);

const BlogContainer = (props: Props) => {
  const flattenedRoutes = flattenRoutes(routes);
  return (
    <div>
      <AnimatedRouter.Switch>
        {flattenedRoutes.map(props => <AnimatedRouter.Route key={props.path} {...props} />)}
      </AnimatedRouter.Switch>
    </div>
  );
};

export default BlogContainer;
