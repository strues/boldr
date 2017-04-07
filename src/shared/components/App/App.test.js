import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import routes from '../../routes';
import App from './App';

describe('<App />', () => {
  const wrapper = shallow(<App route={ routes } />);
  it('renders <App /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(2);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
