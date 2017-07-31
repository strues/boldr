# Sidebar
Sidebar component used in dashboard areas.

**Props:**

```javascript
type SidebarLink = {
  text: string,
  iconType: string,
  key: number,
  id: number,
  exact: ?boolean,
  link: string,
  links: ?SidebarLinks
};

type SidebarLinks = Array<SidebarLink>;

type Props = {
  className: ?string,
  links: SidebarLinks,
  onChange: () => void,
  handleExpandClick: () => void,
  logoClassName: ?string,
  match: Object,
  iconColor: ?string,
  logo: ?any,
  expanded: boolean,
};
```

### Example
```javascript
<Sidebar
  links={ [
    {
      text: 'Post Listing',
      iconType: 'posts',
      key: 1,
      id: 2,
      exact: true,
      link: '/admin/posts',
      links: [
        {
          text: 'Post Listing',
          iconType: 'posts',
          key: 1.1,
          id: 3,
          exact: true,
          link: '/admin/post-listing',
        },
        {
          text: 'Post Listing',
          iconType: 'posts',
          key: 1.2,
          id: 4,
          exact: true,
          link: '/admin/post-listing',
        },
      ],
    },
    {
      text: 'Tags',
      iconType: 'tags',
      key: 2,
      id: 5,
      exact: true,
      link: '/admin/tags',
    },
  ] }
/>
```
