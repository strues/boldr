import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Author from './Author';

describe('<Author />', () => {
  const wrapper = shallow(<Author avatar_url={ 'abcd' } display_name="hey" />);
  it('renders <Author /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.instance().props.display_name).toBe('hey');
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
