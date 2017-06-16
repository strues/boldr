// @flow
import React from 'react';
import Loadable from 'react-loadable';
import { Loader, Icon } from 'boldr-ui';
import ArticleListing from './ArticleListing';
import Article from './Article/Article';
import TagListContainer from './TagList/TagListContainer';

// $FlowIssue
function LoadingComponent({ error }: string) {
  if (error) {
    console.log(error);
    return <p>Error: {error}</p>;
  } else {
    return <Loader />;
  }
}

export default [
  {
    exact: true,
    path: '/blog',
    component: ArticleListing,
    routes: [],
  },
  {
    path: '/blog/:slug',
    exact: true,
    component: Article,
    routes: [],
  },
  {
    exact: true,
    path: '/blog/tags/:name',
    component: TagListContainer,
    routes: [],
  },
];
