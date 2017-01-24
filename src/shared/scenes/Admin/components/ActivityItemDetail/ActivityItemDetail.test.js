import React from 'react';
import { shallow } from 'enzyme';
import ActivityItemDetail from './ActivityItemDetail';

const act = 1;

test('<ActivityItemDetail />, renders the widget with props', () => {
  const wrapper = shallow(<ActivityItemDetail atype={ act } />);
  expect(wrapper.instance().props.atype).toEqual(act);
});

test('<ActivityItemDetail />, displays the correct info', () => {
  const wrapper = shallow(<ActivityItemDetail atype={ 2 } />);
  expect(wrapper.contains(<span>updated</span>)).toEqual(true);
});

test('<ActivityItemDetail />, displays the added text', () => {
  const wrapper = shallow(<ActivityItemDetail atype={ 1 } />);
  expect(wrapper.contains(<span>added</span>)).toEqual(true);
});

test('<ActivityItemDetail />, displays the removed text', () => {
  const wrapper = shallow(<ActivityItemDetail atype={ 3 } />);
  expect(wrapper.contains(<span>removed</span>)).toEqual(true);
});
test('<ActivityItemDetail />, displays the registered text', () => {
  const wrapper = shallow(<ActivityItemDetail atype={ 4 } />);
  expect(wrapper.contains(<span>registered</span>)).toEqual(true);
});
