const sidebarLinks = [
  {
    id: 1,
    label: 'Content',
    icon: 'fa-battery-half',
    items: [
      {
        id: 11,
        label: 'View Posts',
        icon: 'fa-car',
        link: '/admin/posts',
      },
      {
        id: 12,
        label: 'New Post',
        icon: 'fa-bullhorn',
        link: '/admin/new-post',
      },
      {
        label: 'Tags',
        icon: 'fa-tags',
        id: 13,
        link: '/admin/tags',
      },
    ],
  },
  {
    label: 'File Manager',
    icon: 'fa-tags',
    id: 2,
    link: '/admin/filemanager',
  },
  {
    label: 'Edit Navigation',
    icon: 'fa-link',
    id: 3,
    link: '/admin/navigation',
  },
  {
    label: 'Members List',
    icon: 'fa-users',
    id: 4,
    link: '/admin/members',
  },
  {
    label: 'Site Settings',
    icon: 'fa-gear',
    id: 5,
    exact: true,
    link: '/admin/settings',
  },
];
export default sidebarLinks;
