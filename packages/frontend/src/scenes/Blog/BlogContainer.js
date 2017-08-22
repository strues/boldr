/* @flow */

import React from 'react';
import Route from 'react-router-dom/Route';
import { flattenRoutes } from '@boldr/core';
import ArticleListing from './ArticleListing';
import Article from './Article';
import TagList from './TagList';

type Props = {
  path: string,
};

const routes = [
  {
    exact: true,
    path: '/blog',
    component: ArticleListing,
    routes: [
      {
        path: '/blog/:slug',
        exact: true,
        component: Article,
      },
      {
        exact: true,
        path: '/blog/tags/:name',
        component: TagList,
      },
    ],
  },
];
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
