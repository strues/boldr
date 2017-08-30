import React from 'react';
import { shallow } from 'enzyme';

import toJson from 'enzyme-to-json';

import Flex from './Flex';

test('Flex', () => {
  const wrapper = shallow(<Flex />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
