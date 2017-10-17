/* @flow */

import * as React from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { mount } from 'enzyme';

import defaultToolbar from '../../../core/config';
import ModalHandler from '../../../core/eventHandlers/modals';
import ColorPicker from './ColorPicker';

describe('<ColorPicker />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should render in a div', () => {
    expect(
      mount(
        <ColorPicker
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.colorPicker}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should set default values', () => {
    const control = mount(
      <ColorPicker
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.colorPicker}
        modalHandler={new ModalHandler()}
      />,
    );
    const colorPicker = control.find('ColorPicker');
    const state = colorPicker.getElement();
    expect(state.expanded).toBeFalsy();
    expect(state.currentColor).toBeUndefined();
    expect(state.currentBgColor).toBeUndefined();
  });
});
