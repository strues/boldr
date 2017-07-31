/* @flow */

import React from 'react';
import Route from 'react-router-dom/Route';
import { flattenRoutes } from '@boldr/core';
import routes from './routes';

type Props = {
  path: string,
};

// eslint-disable-next-line
const BlogContainer = (props: Props) => {
  const flattenedRoutes: Array<any> = flattenRoutes(routes);
  return (
    <div>
      {flattenedRoutes.map(props => <Route key={props.path} {...props} />)}
    </div>
  );
};

export default BlogContainer;
