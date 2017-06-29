import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DashboardFooter from './DashboardFooter';

describe('<DashboardFooter />', () => {
  const wrapper = shallow(<DashboardFooter copyright="widget" />);
  it('renders <DashboardFooter /> without breaking', () => {
    expect(wrapper.find('footer').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
