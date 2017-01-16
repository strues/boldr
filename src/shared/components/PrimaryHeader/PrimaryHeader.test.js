import React from 'react';
import { shallow } from 'enzyme';

import PrimaryHeader from './PrimaryHeader';

describe('<PrimaryHeader />', () => {
  function setup() {
    const wrapper = shallow(<PrimaryHeader />);
    const instance = wrapper.instance();

    return { wrapper, instance };
  }

  it('renders', () => {
    const { wrapper, instance } = setup();

    expect(wrapper).toBe.ok;
    expect(instance).toBe.ok;
  });
});
