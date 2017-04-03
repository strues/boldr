import React from 'react';

import StatValue from '../StatValue';

const mockTotal = 1;

it('<StatValue />, renders the widget with props', () => {
  const wrapper = shallow(<StatValue total={ 1 } />);
  expect(wrapper.instance().props.total).toEqual(mockTotal);
});
