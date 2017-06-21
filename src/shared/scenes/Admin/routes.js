// @flow
/* eslint-disable */
import React from 'react';
import { Loader, Icon } from 'boldr-ui';
import loadable from '@@core/loadable';
// Admin
import MediaManagerContainer from './Media/MediaManager/MediaManagerContainer';
import UploadMedia from './Media/UploadMedia';
import ArticleEditor from './Content/ArticleEditor';
import NewArticleContainer from './Content/NewArticle/NewArticleContainer';
// import FileManagerContainer
//   from './FileManager/FileManagerContainer';
// import FileEditor from './FileManager/FileEditor';
// import NavigationContainer from './Navigation/NavigationContainer';
import Members from './Members';
import Settings from './Settings';
import TagsContainer from './Content/Tags/TagsContainer';
import TaggedPost from './Content/Tags/components/TaggedPost/TaggedPost';

const ArticlesContainer = loadable(() => import('./Content/Articles/ArticlesContainer' /* webpackChunkName: "dashArticles" */))

const MediaContainer = loadable(() => import('./Media/MediaContainer' /* webpackChunkName: "dashMedia" */))
export default [
  {
    path: '/admin/content/articles',
    breadcrumb: <Icon kind="shovel" />,
    exact: true,
    component: ArticlesContainer,
    routes: [
      {
        breadcrumb: 'New Article',
        path: '/admin/content/articles/new',
        component: NewArticleContainer,
        routes: [],
      },
      {
        exact: true,
        breadcrumb: 'Edit Article',
        path: '/admin/content/articles/:slug',
        component: ArticleEditor,
        routes: [],
      },
      {
        exact: true,
        breadcrumb: 'Tagged Posts',
        path: '/admin/content/tags/:name',
        component: TaggedPost,
        routes: [],
      },
      {
        exact: true,
        breadcrumb: 'Tags',
        path: '/admin/content/tags',
        component: TagsContainer,
        routes: [],
      },
    ],
  },
  // {
  //       exact: true,
  //       path: '/admin/filemanager',
  //       breadcrumb: <Icon kind="folder-upload" />,
  //       component: FileManagerContainer,
  //       routes: [
  //           {
  //               exact: true,
  //               breadcrumb: 'File Editor',
  //               path: '/admin/filemanager/:id',
  //               component: FileEditor,
  //               routes: [],
  //           },
  //       ],
  //   },
  //   {
  //       exact: true,
  //       path: '/admin/navigation',
  //       breadcrumb: <Icon kind="more" />,
  //       component: NavigationContainer,
  //       routes: [],
  //   },
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
