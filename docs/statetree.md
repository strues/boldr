# State Tree

Outline of the state tree upon initial load

```javascript
const preloadedState = {
account: {
    auth: {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
    },
    user: {
      email: '',
      firstName: '',
      lastName: '',
      displayName: '',
      avatarUrl: '',
      role: '',
      roleId: '',
    },
  },
  admin: {
    dashboard: {
      docked: true,
      open: true,
      loaded: false,
      loading: false,
      error: null,
      activities: [],
      stats: {},
    },
    attachments: {
      loading: false,
      error: null,
      files: [],
      postImage: {},
      currentFile: {},
    },
    members: {
      loaded: false,
      loading: false,
      members: [],
      error: null,
      selected: {},
    },
  },
  blog: {
    posts: {
      all: {},
      ids: [],
      isFetching: false,
      currentPost: {},
    },
    tags: {
      all: {},
      ids: [],
      isFetching: false,
    },
  },
  boldr: {
    ui: {
      loaded: false,
      layout: 'grid',
      isMobile: false,
      modal: false,
      drawer: false,
      navbar: false,
    },
    meta: {
      host: '',
    },
    menus: {
      id: -1,
      uuid: '',
      name: '',
      label: '',
      attributes: {},
      restricted: false,
      order: -1,
      details: [],
    },
    settings: {},
  },
  notifications: {},
  entities: {
    posts: {},
    tags: {},
    users: {},
    menus: {},
    menuDetails: {},
  },
  form: {},
  routing: {},
};
}
```
