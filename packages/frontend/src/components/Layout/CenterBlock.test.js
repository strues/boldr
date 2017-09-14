import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CenterBlock from './CenterBlock';
//
describe('<CenterBlock />', () => {
  test('<CenterBlock />, should match the snapshot', () => {
    const wrapper = shallow(<CenterBlock />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('It should render with correct classes', () => {
    const wrapper = mount(<CenterBlock />);
    const wrapperInner = wrapper.find('.grid__row');
    expect(wrapperInner.is('.grid__row')).toBe(true);
  });
});
