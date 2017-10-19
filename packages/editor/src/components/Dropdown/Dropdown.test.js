/* @flow */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

describe('<Dropdown />', () => {
  it('should have a div when rendered', () => {
    const wrapper = shallow(
      <Dropdown>
        <span>abcd</span>
        <DropdownOption>1234</DropdownOption>
      </Dropdown>,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
