import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

it('<Footer />, should have boldrui-footer as its class', () => {
  const wrapper = shallow(<Footer />);
  const wrapperClass = wrapper.find('.boldrui-footer');
  expect(wrapperClass.is('.boldrui-footer')).toBe(true);
});
