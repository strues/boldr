import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Form from '../Form';

describe('<Form />', () => {
  it('should match the snapshot', () => {
    const component = shallow(<Form />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
