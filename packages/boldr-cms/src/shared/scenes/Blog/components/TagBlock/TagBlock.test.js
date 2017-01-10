import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TagBlock from './TagBlock';

describe('<TagBlock />', () => {
  it('renders <TagBlock /> without breaking', () => {
    const wrapper = shallow(<TagBlock />);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('renders snapshot', () => {
    const wrapper = shallow(<TagBlock />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
