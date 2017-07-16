/* eslint-disable */
import React from 'react';
import universal from 'react-universal-component';
import Icon from '@boldr/ui/Icons/Icon';

// Admin
import MediaManagerContainer from './Media/MediaManager/MediaManagerContainer';
import UploadMedia from './Media/UploadMedia';
import ArticleEditor from './Articles/ArticleEditor';
import NewArticleContainer from './Articles/NewArticle/NewArticleContainer';
// import NavigationContainer from './Navigation/NavigationContainer';
import Members from './Members';
import Settings from './Settings';
import TagsContainer from './Tags/TagsContainer';
import TaggedPost from './Tags/components/TaggedPost/TaggedPost';
import DashboardLanding from './DashboardLanding';

const ArticlesContainer = universal(() => import('./Articles/ArticleListing/ArticlesContainer'), {
  resolve: () => require.resolveWeak('./Articles/ArticleListing/ArticlesContainer'),
});
const MediaContainer = universal(() => import('./Media/MediaContainer'), {
  resolve: () => require.resolveWeak('./Media/MediaContainer'),
});
const NavigationContainer = universal(() => import('./Navigation/NavigationContainer'), {
  resolve: () => require.resolveWeak('./Navigation/NavigationContainer'),
});

export default [
  {
    exact: true,
    path: '/admin',
    component: DashboardLanding,
    routes: [],
  },
  {
    path: '/admin/articles',
    breadcrumb: <Icon kind="posts" />,
    exact: true,
    component: ArticlesContainer,
    routes: [
      {
        breadcrumb: 'New Article',
        path: '/admin/articles/new',
        component: NewArticleContainer,
        routes: [],
      },
      {
        exact: true,
        breadcrumb: 'Edit Article',
        path: '/admin/articles/:slug',
        component: ArticleEditor,
        routes: [],
      },
    ],
  },
  {
    exact: true,
    breadcrumb: <Icon kind="tags" />,
    path: '/admin/tags',
    component: TagsContainer,
    routes: [
      {
        exact: true,
        breadcrumb: 'Tagged Posts',
        path: '/admin/tags/:name',
        component: TaggedPost,
        routes: [],
      },
    ],
  },
  {
    exact: true,
    path: '/admin/navigation',
    breadcrumb: <Icon kind="more" />,
    component: NavigationContainer,
    routes: [],
  },
  {
    exact: true,
    path: '/admin/settings',
    breadcrumb: <Icon kind="settings" />,
    component: Settings,
    routes: [],
  },
  {
    exact: true,
    path: '/admin/members',
    breadcrumb: <Icon kind="account" />,
    component: Members,
    routes: [],
  },
  {
    exact: true,
    path: '/admin/media',
    breadcrumb: <Icon kind="folder-upload" />,
    component: MediaContainer,
    routes: [
      {
        exact: true,
        breadcrumb: 'Upload',
        path: '/admin/media/upload',
        component: UploadMedia,
        routes: [],
      },
      {
        exact: true,
        breadcrumb: 'Manage',
        path: '/admin/media/:id',
        component: MediaManagerContainer,
        routes: [],
      },
    ],
  },
];
