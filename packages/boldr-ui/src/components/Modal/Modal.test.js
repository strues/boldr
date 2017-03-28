import React from 'react';
import { shallow } from 'enzyme';

import Modal from './Modal';

describe('<Modal />', () => {
  function setup() {
    const wrapper = shallow(<Modal visible />);
    const instance = wrapper.instance();

    return {
      wrapper,
      instance,
    };
  }

  it('renders', () => {
    const { wrapper, instance } = setup();

    expect(wrapper).toBe.ok;
    expect(instance).toBe.ok;
  });
});
