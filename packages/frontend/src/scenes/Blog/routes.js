// @flow
import ArticleListingContainer from './ArticleListing/ArticleListingContainer';
import ArticleContainer from './Article/ArticleContainer';
import TagListContainer from './TagList/TagListContainer';

export default [
  {
    exact: true,
    path: '/blog',
    component: ArticleListingContainer,
    routes: [
      {
        path: '/blog/:slug',
        exact: true,
        component: ArticleContainer,
      },
      {
        exact: true,
        path: '/blog/tags/:name',
        component: TagListContainer,
      },
    ],
  },
];
