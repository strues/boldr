import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import 'jest-styled-components';

import Layout from './Layout';

describe('Layout', () => {
  it('renders snapshot', () => {
    const container = shallow(<Layout>Layout</Layout>);
    expect(shallowToJson(container)).toMatchSnapshot();
  });
});
