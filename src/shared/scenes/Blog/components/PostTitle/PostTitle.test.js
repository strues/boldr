import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PostTitle from './PostTitle';

describe('<PostTitle />', () => {
  test('renders <PostTitle /> without breaking', () => {
    const wrapper = shallow(<PostTitle title="Random Post Title" />);
    expect(wrapper.find('h1').length).toBe(1);
  });

  it('accepts props and renders them.', () => {
    const wrapper = shallow(<PostTitle title="Random Post Title" />);
    expect(wrapper.instance().props.title).toBe('Random Post Title');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<PostTitle created="Random Post Title" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
