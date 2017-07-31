/* @flow */

import React from 'react';
import { shallow, mount } from 'enzyme';
import ModalHandler from '../../eventHandlers/modals';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

describe('<Dropdown />', () => {
  it('should have a div when rendered', () => {
    expect(
      shallow(
        <Dropdown modalHandler={new ModalHandler()}>
          <span>abcd</span>
          <DropdownOption>1234</DropdownOption>
        </Dropdown>,
      ).node.type,
    ).toEqual('div');
  });
});
