import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Image from './Image';

it('<Image /> renders the Image svg component', () => {
  const wrapper = shallow(<Image />);
  const wrapperClass = wrapper.find('.boldr-image');
  expect(wrapperClass.is('.boldr-image')).toBe(true);
});

it('renders snapshot', () => {
  const wrapper = shallow(<Image />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
