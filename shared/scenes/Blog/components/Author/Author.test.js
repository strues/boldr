import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Author from './Author';

describe('<Author />', () => {
  const wrapper = shallow(<Author avatar_url={ 'abcd' } username="hey" />);
  it('renders <Author /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.instance().props.username).toBe('hey');
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
