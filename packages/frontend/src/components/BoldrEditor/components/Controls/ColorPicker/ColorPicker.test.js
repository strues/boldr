/* @flow */

import React from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { mount } from 'enzyme';
import defaultToolbar from '../../../config/defaultToolbar';
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
      />,
    );
    const colorPicker = control.find('ColorPicker');
    const state = colorPicker.node.state;
    expect(state.expanded).toBeFalsy();
    expect(state.currentColor).toBeUndefined();
    expect(state.currentBgColor).toBeUndefined();
  });
});
