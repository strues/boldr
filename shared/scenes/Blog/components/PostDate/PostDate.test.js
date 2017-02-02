import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PostDate from './PostDate';

describe('<PostDate />', () => {
  test('renders <PostDate /> without breaking', () => {
    const wrapper = shallow(<PostDate created="2017-01-27T02:52:52.687Z" />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('accepts props and renders them.', () => {
    const wrapper = shallow(
      <PostDate
        created="2017-01-27T02:52:52.687Z"
      />);
    expect(wrapper.instance().props.created).toBe('2017-01-27T02:52:52.687Z');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<PostDate created="2017-01-27T02:52:52.687Z" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
