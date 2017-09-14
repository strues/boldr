/* eslint-env jest */
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import Tag from './Tag';

test('<Tag /> matches the snapshot', () => {
  const wrapper = shallow(<Tag id="a">abc</Tag>);

  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
test('should add the passed "className" prop to the rendered node if passed.', () => {
  const wrapper = shallow(<Tag id="a">abc</Tag>);

  expect(wrapper.is('.boldr-tag')).toBe(true);
});
test('should adapt to size prop', () => {
  const wrapper = shallow(
    <Tag id="a" size="large">
      abc
    </Tag>,
  );

  expect(wrapper.is('.boldr-tag__lg')).toBe(true);
});
