import universal from 'react-universal-component';

const BlogContainer = universal(() => import('./BlogContainer'), {
  resolve: () => require.resolveWeak('./BlogContainer'),
});

export default BlogContainer;
