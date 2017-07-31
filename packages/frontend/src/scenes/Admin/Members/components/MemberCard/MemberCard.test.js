import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MemberCard from './MemberCard';

const userData = {
  id: 'abad-12dc-3dfd',
  username: 'joe',
  email: 'test@test.com',
  roles: [{ id: 1, name: 'admin' }],
  avatarUrl: 'http://img.com/img.png',
};
const id = 'abad-12dc-3dfd';

describe('<MemberCard />', () => {
  it('should render the user props', () => {
    const handleToggle = jest.fn();
    const renderedComponent = shallow(
      <MemberCard
        user={userData}
        key={1}
        username="joe"
        handleToggle={handleToggle}
        id="abad-12dc-3dfd"
        avatarUrl="http://img.com/img.png"
        email="test@test.com"
        roleName="admin"
      />,
    );
    expect(shallowToJson(renderedComponent)).toMatchSnapshot();
  });
});
