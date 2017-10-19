/* @flow */

import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import defaultToolbar from '../../../core/config';
import ModalHandler from '../../../core/eventHandlers/modals';
import TextAlign from './TextAlign';

describe('<TextAlign />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(
        <TextAlign
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.textAlign}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have 4 child elements by default', () => {
    const control = mount(
      <TextAlign
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.textAlign}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(1);
  });

  it('should have 1 child elements if inDropdown is true', () => {
    const control = mount(
      <TextAlign
        onChange={() => {}}
        editorState={editorState}
        config={{ ...defaultToolbar.textAlign, inDropdown: true }}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(1);
    expect(control.childAt(0).children().length).toEqual(1);
  });
});
