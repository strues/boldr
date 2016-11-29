import React from 'react';
import { shallow } from 'enzyme';

import Dialog from './Dialog';

describe('<Dialog />', () => {
  function setup() {
    const wrapper = shallow(<Dialog />);
    const instance = wrapper.instance();

    return { wrapper, instance };
  }

  it('renders', () => {
    const { wrapper, instance } = setup();

    expect(wrapper).toBe.ok;
    expect(instance).toBe.ok;
  });
});
