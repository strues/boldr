import universal from 'react-universal-component';

const AccountContainer = universal(() => import('./AccountContainer'), {
  resolve: () => require.resolveWeak('./AccountContainer'),
});

export default AccountContainer;
