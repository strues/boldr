/* @flow */

import React from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { mount } from 'enzyme';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../eventHandlers/modals';
import History from './History';

describe('<History />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(
        <History
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.history}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have 2 child elements', () => {
    const control = mount(
      <History
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.history}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(2);
  });
});
