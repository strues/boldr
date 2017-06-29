const sidebarLinks = [
  {
    id: 1,
    label: 'Content',
    icon: 'package',
    items: [
      {
        id: 11,
        label: 'Articles',
        icon: 'file-text',
        link: '/admin/content/articles',
      },
      {
        id: 12,
        label: 'New Article',
        icon: 'file-plus',
        link: '/admin/content/articles/new',
      },
      {
        label: 'Tags',
        icon: 'tag',
        id: 13,
        link: '/admin/content/tags',
      },
    ],
  },
  // {
  //   label: 'File Manager',
  //   icon: 'fa-file-code-o',
  //   id: 2,
  //   link: '/admin/filemanager',
  // },
  {
    label: 'Media Gallery',
    icon: 'image',
    id: 3,
    link: '/admin/media',
  },
  {
    label: 'Upload Media',
    icon: 'folder-upload',
    id: 4,
    link: '/admin/media/upload',
  },
  {
    label: 'Navigation',
    icon: 'navigation',
    id: 5,
    link: '/admin/navigation',
  },
  {
    label: 'Members List',
    icon: 'account',
    id: 6,
    link: '/admin/members',
  },
  {
    label: 'Site Settings',
    icon: 'settings',
    id: 7,
    exact: true,
    link: '/admin/settings',
  },
];
export default sidebarLinks;
