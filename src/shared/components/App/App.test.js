import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import App from './App';

const route = {
  routes: [{ id: 1 }, { id: 2 }],
};
test('renders App', () => {
  const component = shallow(<App route={route} />);
  expect(shallowToJson(component)).toMatchSnapshot();
});
