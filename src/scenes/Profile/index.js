import universal from 'react-universal-component';

const ProfileContainer = universal(() => import('./ProfileContainer'), {
  resolve: () => require.resolveWeak('./ProfileContainer'),
});

export default ProfileContainer;
