/* @flow */

import React from 'react';
import { mount } from 'enzyme';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import ModalHandler from '../../../core/eventHandlers/modals';
import defaultToolbar from '../../../core/config';
import Link from './Link';

describe('<Link />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(
        <Link
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.link}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have 1 child elements by default', () => {
    const control = mount(
      <Link
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(1);
  });
});
