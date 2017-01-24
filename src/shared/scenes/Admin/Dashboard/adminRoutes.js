export default [
  {
    path: '',
    icon: 'home',
    primaryText: 'Home',
  },
  {
    path: 'admin',
    icon: 'dashboard',
    primaryText: 'Dashboard',
  },
  { key: 'divider', divider: true },
  {
    primaryText: 'Posts',
    path: 'admin/posts',
    icon: 'library_books',
    nestedItems: [
      {
        icon: 'list',
        primaryText: 'List Posts',
        path: '',
      },
      {
        icon: 'note_add',
        primaryText: 'Create Post',
        path: 'new',
      },
    ],
  },
  {
    primaryText: 'Tags',
    path: 'admin/tags',
    icon: 'label',
  },
  {
    primaryText: 'File Manager',
    path: 'admin/filemanager',
    icon: 'cloud_upload',
  },
  {
    primaryText: 'Navigation',
    path: 'admin/navigation',
    icon: 'insert_link',
  },
  {
    primaryText: 'Members',
    path: 'admin/members',
    icon: 'people',
  },
  {
    primaryText: 'Templates',
    path: 'admin/templates',
    icon: 'web',
  },
];
