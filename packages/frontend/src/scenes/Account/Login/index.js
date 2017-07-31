import universal from 'react-universal-component';

const LoginContainer = universal(() => import('./LoginContainer'), {
  resolve: () => require.resolveWeak('./LoginContainer'),
});

export default LoginContainer;
