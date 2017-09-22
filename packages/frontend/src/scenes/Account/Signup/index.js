import universal from 'react-universal-component';

const SignupContainer = universal(() => import('./SignupContainer'), {
  resolve: () => require.resolveWeak('./SignupContainer'),
});

export default SignupContainer;
