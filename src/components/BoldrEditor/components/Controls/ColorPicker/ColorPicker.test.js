/* @flow */

import React from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { mount } from 'enzyme';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../eventHandlers/modals';
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
    const state = colorPicker.node.state;
    expect(state.expanded).toBeFalsy();
    expect(state.currentColor).toBeUndefined();
    expect(state.currentBgColor).toBeUndefined();
  });

  it('should set variable signalExpanded to true when first child is clicked', () => {
    const control = mount(
      <ColorPicker
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.colorPicker}
        modalHandler={new ModalHandler()}
      />,
    );
    const colorPicker = control.find('ColorPicker');
    expect(colorPicker.node.signalExpanded).toBeFalsy();
    control.find('Option').simulate('click');
    expect(colorPicker.node.signalExpanded).toBeTruthy();
  });
});
