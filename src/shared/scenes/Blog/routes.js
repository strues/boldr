// @flow
import React from 'react';
import ArticleListing from './ArticleListing';
import Article from './Article/Article';
import TagListContainer from './TagList/TagListContainer';


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
