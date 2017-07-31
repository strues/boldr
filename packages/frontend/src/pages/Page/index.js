import universal from 'react-universal-component';

const Page = universal(() => import('./Page'), {
  resolve: () => require.resolveWeak('./Page'),
});

export default Page;
