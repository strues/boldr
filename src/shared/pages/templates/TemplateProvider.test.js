import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TemplateProvider from './TemplateProvider';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('<TemplateProvider />', () => {
  const initialState = {};
  const store = mockStore(initialState);
  const wrapper = shallow(<Provider store={ store }><TemplateProvider /></Provider>);
  test('renders <TemplateProvider /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(0);
  });
  test('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
