import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Tag from './Tag';

describe('<Tag />', () => {
  it('accepts props and renders them.', () => {
    const wrapper = shallow(
      <Tag name="imATag" />);
    expect(wrapper.instance().props.name).toBe('imATag');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<Tag />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
