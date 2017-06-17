import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import fakeAttachments from '../../__fixtures__/attachments.fixture';
import FileCardView from './FileCardView';

test('<FileCardView />, renders with files as props', () => {
  const wrapper = shallow(<FileCardView files={fakeAttachments} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
