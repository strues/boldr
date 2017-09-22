import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TagBlock from './TagBlock';

const fakeTags = [
  {
    id: 1,
    name: 'a',
  },
  {
    id: 2,
    name: 'b',
  },
];
describe('<TagBlock />', () => {
  it('renders <TagBlock /> without breaking if theres no tags', () => {
    const wrapper = shallow(<TagBlock />);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('renders <TagBlock /> with tags', () => {
    const wrapper = shallow(<TagBlock tags={fakeTags} />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('renders snapshot', () => {
    const wrapper = shallow(<TagBlock />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
