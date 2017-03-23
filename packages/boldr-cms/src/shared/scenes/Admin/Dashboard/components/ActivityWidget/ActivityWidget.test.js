import React from 'react';
import { shallow } from 'enzyme';
import ActivityWidget from './ActivityWidget';

const act = [
  {
    id: 'asdfasdfasdf',
    type: 'register',
    created_at: '08/01/1000',
    owner: {
      avatarUrl: 'Me',
    },
  },
  {
    id: 'asdfasdfasdf',
    type: 'register',
    created_at: '08/01/1000',
    owner: {
      avatarUrl: 'Me',
    },
  },
];

it('<ActivityWidget />, renders the widget with props', () => {
  const wrapper = shallow(<ActivityWidget activities={ act } />);
  expect(wrapper.instance().props.activities).toEqual(act);
});
