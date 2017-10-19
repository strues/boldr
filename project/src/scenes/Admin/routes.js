/* eslint-disable */
import React from 'react';
import universal from 'react-universal-component';

import Media from './Media';
import MediaManager from './Media/MediaManager';
import UploadMedia from './Media/UploadMedia';
import ArticleEditor from './Articles/ArticleEditor';
import NewArticleContainer from './Articles/NewArticle/NewArticleContainer';
import Content from './Content';
import Members from './Members';
import Settings from './Settings';
import Tags from './Tags';
import TaggedPost from './Tags/components/TaggedPost/TaggedPost';
import DashboardLanding from './DashboardLanding';
import Articles from './Articles/ArticleListing';
import NavigationContainer from './Navigation/NavigationContainer';

export default [
  {
    exact: true,
    path: '/admin',
    component: DashboardLanding,
    routes: [],
  },
  {
    exact: true,
    path: '/admin/content',
    component: Content,
    routes: [],
  },
  {
    path: '/admin/articles',

    exact: true,
    component: Articles,
    routes: [
      {

        path: '/admin/articles/new',
        component: NewArticleContainer,
        routes: [],
      },
      {
        exact: true,

        path: '/admin/articles/:slug',
        component: ArticleEditor,
        routes: [],
      },
    ],
  },
  {
    exact: true,
    // breadcrumb: <Icon kind="tags" />,
    path: '/admin/tags',
    component: Tags,
    routes: [
      {
        exact: true,

        path: '/admin/tags/:name',
        component: TaggedPost,
        routes: [],
      },
    ],
  },
  {
    exact: true,
    path: '/admin/navigation',
    component: NavigationContainer,
    routes: [],
  },
  {
    exact: true,
    path: '/admin/settings',
    component: Settings,
    routes: [],
  },
  {
    exact: true,
    path: '/admin/members',
    component: Members,
    routes: [],
  },
  {
    exact: true,

    component: Media,
    routes: [
      {
        exact: true,

        path: '/admin/media/upload',
        component: UploadMedia,
        routes: [],
      },
      {
        exact: true,

        path: '/admin/media/:id',
        component: MediaManager,
        routes: [],
      },
    ],
  },
];
