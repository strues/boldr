import universal from 'react-universal-component';

const AdminDashboard = universal(props => import('./AdminDashboard'), {
  minDelay: 1000,
});
export default AdminDashboard;
