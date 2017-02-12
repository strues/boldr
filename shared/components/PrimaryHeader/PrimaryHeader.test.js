import React from 'react';
import { shallow } from 'enzyme';

import PrimaryHeader from './PrimaryHeader';

describe('<PrimaryHeader />', () => {
  const fakeMenu = {
    id: 1,
    text: 'abc',
    details: [
      {
        id: 2,
        name: 'a',
        link: 'b',
      },
      {
        id: 3,
        name: 'a',
        link: 'b',
      },
    ],
  };
  const fakeAuth = {
    isAuthenticated: true,
    error: null,
    loading: false,
    token: 'aaaccdf23423b',
  };
  function setup() {
    const wrapper = shallow(<PrimaryHeader menu={ fakeMenu } auth={ fakeAuth } />);
    const instance = wrapper.instance();

    return { wrapper, instance };
  }

  it('renders', () => {
    const { wrapper, instance } = setup();

    expect(wrapper).toBe.ok;
    expect(instance).toBe.ok;
  });
});
