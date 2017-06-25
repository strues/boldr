/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Paper from './Paper';

test('<Paper /> Matches the snap', () => {
  const wrapper = shallow(<Paper zDepth={1} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
