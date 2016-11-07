import React from 'react';
import { shallow } from 'enzyme';
import BoldrLogo from './BoldrLogo';

it('<BoldrLogo /> renders the logo svg component', () => {
  const wrapper = shallow(<BoldrLogo />);
  expect(wrapper.find('#boldrlogo').length).toBe(1);
});
