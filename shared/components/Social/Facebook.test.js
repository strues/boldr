import React from 'react';
import { shallow, mount } from 'enzyme';
import Facebook from './Facebook';

test('<Facebook />', () => {
  const wrapper = shallow(<Facebook href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
