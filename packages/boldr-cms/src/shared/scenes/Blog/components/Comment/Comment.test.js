import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Comment from './Comment';

const commentProps = {
  commenter: { username: 'person', avatarUrl: 'google.com' },
  isAuthenticated: false,
  canModerate: false,
  comment: {
    content: 'hey',
    created_at: '2017-02-14',
  },
};
describe('<Comment />', () => {
  const wrapper = shallow(<Comment { ...commentProps } />);
  it('renders <Comment /> without breaking', () => {
    expect(wrapper.find('.boldr-comment').length).toBe(1);
  });
});
