// @flow

import React from 'react';
import Route from 'react-router-dom/Route';
import { flattenRoutes } from '@boldr/core';
import type { NavRoute, FlattenedRoutes } from '../../types/boldr';
import ArticleListing from './ArticleListing';
import Article from './Article';
import TagList from './TagList';

type Props = {
  path: string,
};

const routes: Array<NavRoute> = [
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
  const flattenedRoutes: FlattenedRoutes = flattenRoutes(routes);
  return <div>{flattenedRoutes.map(props => <Route key={props.path} {...props} />)}</div>;
};

export default BlogContainer;
