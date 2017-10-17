/* @flow */

import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should have a div when rendered', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.be-spinner').length).toBe(1);
  });
});
