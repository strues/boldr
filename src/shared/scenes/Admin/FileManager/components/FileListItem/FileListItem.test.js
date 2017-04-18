import React from 'react';
import {mount, shallow} from 'enzyme';
import fakeAttachment from '../../__fixtures__/attachment.fixture';
import createRouterContext
  from '../../../../../../../internal/jest/createRouteContext';
import FileListItem from './FileListItem';

const file = {
  id: 'aaa',
  name: 'aaa',
};

test('<FileListItem />, renders the widget with props', () => {
  FileListItem.contextTypes = {
    router: React.PropTypes.object,
  };
  const childContextTypes = {
    router: React.PropTypes.object,
  };
  const context = createRouterContext();
  const wrapper = mount(
    <FileListItem imgSrc={fakeAttachment.url} file={file}>
      {fakeAttachment.fileName}
    </FileListItem>,
    {
      context,
      childContextTypes,
    },
  );

  expect(wrapper.html()).toContain('BkRV_tCDe.jpg');
});
