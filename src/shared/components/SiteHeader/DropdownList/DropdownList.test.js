import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DropdownList from './DropdownList';

describe('<DropdownList />', () => {
  it('should render with the base element', () => {
    const wrapper = shallow(<DropdownList data={[]} />);
    expect(wrapper.find('.boldrui-sh__nav-dropdown-list').length).toBe(1);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<DropdownList data={[]} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
