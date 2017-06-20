/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import AnimatedRouter from '@@components/AnimatedRouter';
import flattenRoutes from '@@core/flattenRoutes';
import routes from './routes';

type Props = {
  path: string,
};

const BlogContainer = (props: Props) => {
  const flattenedRoutes = flattenRoutes(routes);
  return (
    <div>
      {flattenedRoutes.map(props => <AnimatedRouter.Route key={props.path} {...props} />)}
    </div>
  );
};

export default BlogContainer;
