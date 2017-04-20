import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SiteHeaderDropdown from './SiteHeaderDropdown';

const SHData = {
  id: 1,
  children: {
    items: [{ id: 1 }, { id: 2 }],
  },
};
describe('<SiteHeaderDropdown />', () => {
  it('should render with the base element', () => {
    const wrapper = shallow(<SiteHeaderDropdown data={SHData} />);
    expect(wrapper.find('.boldrui-sh__nav-dropdown').length).toBe(1);
  });
  it('should render only toggle the open class if props.open', () => {
    const wrapper = shallow(<SiteHeaderDropdown data={SHData} />);
    expect(wrapper.find('.boldrui-sh__nav-dropdown-open').length).toBe(0);
  });
  it('should render only toggle the class if open', () => {
    const wrapper = shallow(<SiteHeaderDropdown data={SHData} open />);
    expect(wrapper.find('.boldrui-sh__nav-dropdown-open').length).toBe(1);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<SiteHeaderDropdown data={SHData} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
