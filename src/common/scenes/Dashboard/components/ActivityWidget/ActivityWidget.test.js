import React from 'react';
import { shallow } from 'enzyme';
import ActivityWidget from './ActivityWidget';

const act = [
  {
    id: 'asdfasdfasdf',
    action: 'create',
    created_at: '08/01/1000',
    owner: {
      display_name: 'Me',
    },
    name: 'new',
  },
  {
    id: 'asdfasdfasdf',
    action: 'create',
    created_at: '08/01/1000',
    owner: {
      display_name: 'Me',
    },
    name: 'new',
  },
];

it('<ActivityWidget />, renders the widget with props', () => {
  const wrapper = shallow(<ActivityWidget activities={ act } />);
  expect(wrapper.instance().props.activities).toEqual(act);
});
