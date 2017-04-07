import React from 'react';
import routes from '../../routes';
import { AdminDashboard } from './AdminDashboard';

test('<AdminDashboard />, renders the content area', () => {
  const toggleDrawer = jest.fn();
  const me = {
    avatarUrl: 'aaa',
    firstName: 'aaa',
    username: 'aaa',
  };
  const wrapper = shallow(<AdminDashboard route={ routes } me={ me } />);
  expect(wrapper.is('.boldrui-dashboard')).toEqual(true);
});
