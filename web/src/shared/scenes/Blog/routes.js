// @flow
import React from 'react';
import { Loader, Icon } from 'boldr-ui';
import Loadable from '../../components/Loadable/Loadable';
import ArticleListingContainer from './ArticleListing';
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
    breadcrumb: <Icon kind="shovel" />,
    component: ArticleListingContainer,
    routes: [
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
      },
    ],
  },
];
