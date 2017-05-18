/* eslint-disable */
import React from 'react';
import { Loader } from 'boldr-ui';
import type { Dispatch } from './types/redux';

import Loadable from './components/Loadable/Loadable';
import App from './components/App';
import Home from './pages/Home';
import About from './pages/About';
import Error404 from './pages/Error404';
// Account
import LoginContainer from './scenes/Account/Login/LoginContainer';
import SignupContainer from './scenes/Account/Signup/SignupContainer';
import ForgotPassword from './scenes/Account/ForgotPassword';
import ResetPassword from './scenes/Account/ResetPassword';
import Verify from './scenes/Account/Verify';
import PreferencesContainer from './scenes/Account/Preferences';
// Profile
import ProfileContainer from './scenes/Profile/ProfileContainer';

// Blog
import ArticleListingContainer
  from './scenes/Blog/ArticleListing/ArticleListingContainer';
import Article from './scenes/Blog/Article/Article';
import TagListContainer from './scenes/Blog/TagList/TagListContainer';

// Admin
import MediaManagerContainer
  from './scenes/Admin/Media/MediaManager/MediaManagerContainer';
import UploadMedia from './scenes/Admin/Media/UploadMedia';
import ArticleEditor from './scenes/Admin/Content/ArticleEditor';
import NewArticleContainer
  from './scenes/Admin/Content/NewArticle/NewArticleContainer';
import FileManagerContainer
  from './scenes/Admin/FileManager/FileManagerContainer';
import FileEditor from './scenes/Admin/FileManager/FileEditor';
import NavigationContainer from './scenes/Admin/Navigation/NavigationContainer';
import Members from './scenes/Admin/Members';
import Settings from './scenes/Admin/Settings';
import TagsContainer from './scenes/Admin/Content/Tags/TagsContainer';
import TaggedPost from './scenes/Admin/Content/Tags/components/TaggedPost/TaggedPost';
import DashboardContainer from './scenes/Admin/Dashboard/DashboardContainer';

function LoadingComponent({ error }) {
  if (error) {
    console.log(error);
    return <p>Error: {error}</p>;
  } else {
    return <Loader />;
  }
}
const ArticlesContainer = Loadable({
  // $FlowIssue
  loader: () => import('./scenes/Admin/Content/Articles/ArticlesContainer' /* webpackChunkName: "dashboard-articles" */),
  LoadingComponent,
});
const AdminDashboard = Loadable({
  loader: () => import('./scenes/Admin/AdminDashboard' /* webpackChunkName: "dashboard" */),
  LoadingComponent,
});
const MediaContainer = Loadable({
  loader: () => import('./scenes/Admin/Media/MediaContainer'),
  LoadingComponent,
});

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/about',
        exact: true,
        component: About,
      },
      {
        path: '/blog',
        exact: true,
        component: ArticleListingContainer,
      },
      {
        path: '/blog/:slug',
        exact: true,
        component: Article,
      },
      {
        path: '/blog/tags/:name',
        exact: true,
        component: TagListContainer,
      },
      {
        path: '/account/login',
        exact: true,
        component: LoginContainer,
      },
      {
        path: '/account/signup',
        exact: true,
        component: SignupContainer,
      },
      {
        path: '/account/forgot-password',
        exact: true,
        component: ForgotPassword,
      },
      {
        path: '/account/reset-password/:token',
        exact: true,
        component: ResetPassword,
      },
      {
        path: '/account/verify/:token',
        exact: true,
        component: Verify,
      },
      {
        path: '/account/preferences',
        component: PreferencesContainer,
        exact: true,
      },
      {
        path: '/profiles/:username',
        component: ProfileContainer,

      },
      {
        path: '/admin',
        component: AdminDashboard,
        auth: {
          required: true,
          redirect: '/account/login',
          status: 307,
        },
        routes: [
          {
            path: '/admin/content/articles',
            exact: true,
            strict: true,
            component: ArticlesContainer,

          },
          {
            path: '/admin/content/articles/new',
            exact: true,
            component: NewArticleContainer,
          },
          {
            path: '/admin/content/articles/:slug',
            exact: true,
            component: ArticleEditor,
          },
          {
            path: '/admin/content/tags/:name',
            exact: true,
            component: TaggedPost,
          },
          {
            path: '/admin/content/tags',
            exact: true,
            component: TagsContainer,

          },
          {
            path: '/admin/filemanager',
            exact: true,
            component: FileManagerContainer,

          },
          {
            path: '/admin/file-editor/:id',
            exact: true,
            component: FileEditor,
          },
          {
            path: '/admin/navigation',
            exact: true,
            component: NavigationContainer,

          },
          {
            path: '/admin/members',
            exact: true,
            component: Members,

          },
          {
            path: '/admin/settings',
            exact: true,
            component: Settings,
          },

          {
            path: '/admin/media',
            exact: true,
            component: MediaContainer,

          },
          {
            path: '/admin/media/upload',
            exact: true,
            component: UploadMedia,
          },
          {
            path: '/admin/media/:id',
            exact: true,
            component: MediaManagerContainer,
          },
        ],
      },
      {
        path: '*',
        component: Error404,
      },
    ],
  },
];
