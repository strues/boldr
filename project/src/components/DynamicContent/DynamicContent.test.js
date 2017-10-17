import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import DynamicContent from './DynamicContent';

test('should match the snapshot', () => {
  const wrapper = shallow(
    <DynamicContent dangerouslySetInnerHTML={{ __html: '<p>Hello World</p>' }} />,
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
