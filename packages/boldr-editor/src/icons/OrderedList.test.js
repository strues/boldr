import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import OrderedList from './OrderedList';

describe('<OrderedList />', () => {
  const wrapper = shallow(<OrderedList />);
  it('renders <OrderedList /> without breaking', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
