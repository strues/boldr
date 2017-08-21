// @flow
import ArticleListing from './ArticleListing';
import Article from './Article';
import TagList from './TagList';

export default [
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
