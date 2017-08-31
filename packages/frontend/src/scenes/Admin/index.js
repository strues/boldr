import universal from 'react-universal-component';

const AdminDashboard = universal(() => import('./AdminDashboard'), {
  resolve: () => require.resolveWeak('./AdminDashboard'),
});

export default AdminDashboard;
