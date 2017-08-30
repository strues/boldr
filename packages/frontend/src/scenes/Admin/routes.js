/* eslint-disable */
import * as React from 'react';
import universal from 'react-universal-component';
import Icon from '@boldr/ui/Icons/Icon';
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
    breadcrumb: <Icon kind="posts" />,
    exact: true,
    component: Articles,
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
    component: Tags,
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
    component: Media,
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
        component: MediaManager,
        routes: [],
      },
    ],
  },
];
