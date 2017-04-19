import React from 'react';
import { shallow } from 'enzyme';
import fakeAttachments from '../../__fixtures__/attachments.fixture';
import FileListView from './FileListView';

test('<FileListView />, renders the widget with props', () => {
  const wrapper = shallow(<FileListView files={fakeAttachments} />);
  expect(wrapper.find('.boldr-filemanager__list').length).toBe(1);
});
