import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Codeblock from './Codeblock';

describe('<Codeblock />', () => {
  const wrapper = shallow(<Codeblock />);
  it('renders <Codeblock /> without breaking', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
