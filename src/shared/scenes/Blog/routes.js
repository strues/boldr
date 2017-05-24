// @flow
/* eslint-disable */
import React from 'react';
import { Loader, Icon } from 'boldr-ui';
import Loadable from '../../components/Loadable/Loadable';
import ArticleListingContainer from './ArticleListing';
import Article from './Article/Article';
import TagListContainer from './TagList/TagListContainer';


function LoadingComponent({ error }) {
  if (error) {
    console.log(error);
    return <p>Error: {error}</p>;
  } else {
    return <Loader />;
  }
}
// const ArticlesContainer = Loadable({
//   // $FlowIssue
//   loader: () =>
//     import(
//       './Content/Articles/ArticlesContainer' /* webpackChunkName: "dashboard-articles" */,
//     ),
//   LoadingComponent,
// });
// const Dashboard = Loadable({
//   loader: () =>
//     import('./Dashboard' /* webpackChunkName: "dashboard" */),
//   LoadingComponent,
// });
// const MediaContainer = Loadable({
//   loader: () => import('./Media/MediaContainer'),
//   LoadingComponent,
// });


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
