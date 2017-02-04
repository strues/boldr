import React from 'react';
import { shallow } from 'enzyme';
import fakeAttachment from '../../__fixtures__/attachment.fixture';
import FileListItem from './FileListItem';

test('<FileListItem />, renders the widget with props', () => {
  const wrapper = shallow(
    <FileListItem imgSrc={ fakeAttachment.url }>
      { fakeAttachment.file_name }
    </FileListItem>
  );

  expect(wrapper.html()).toContain('BkRV_tCDe.jpg');
});
