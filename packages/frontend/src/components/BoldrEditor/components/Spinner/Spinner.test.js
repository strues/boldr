/* @flow */

import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should have a div when rendered', () => {
    expect(shallow(<Spinner />).node.type).toEqual('div');
  });
});
