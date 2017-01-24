import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Widget from './Widget';

describe('<Widget />', () => {
  const wrapper = shallow(<Widget name="widget" />);
  it('renders <Widget /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
