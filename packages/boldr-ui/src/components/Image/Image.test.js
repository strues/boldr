import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Image from './Image';

it('<Image /> renders the Image svg component', () => {
  const wrapper = shallow(<Image />);
  const wrapperClass = wrapper.find('.boldrui-image');
  expect(wrapperClass.is('.boldrui-image')).toBe(true);
});

it('renders snapshot', () => {
  const wrapper = shallow(<Image />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
