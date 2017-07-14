/* @flow */

import React from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { mount } from 'enzyme';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../eventHandlers/modals';
import Image from './Image';

describe('ImageControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(
        <Image
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.image}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have 1 child element by default', () => {
    const control = mount(
      <Image
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.image}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(1);
  });

  it('should set signalExpanded to true when option is clicked', () => {
    const control = mount(
      <Image
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.image}
        modalHandler={new ModalHandler()}
      />,
    );
    const imageControl = control.find('Image');
    expect(imageControl.node.signalExpanded).toBeFalsy();
    control.find('Option').simulate('click');
    expect(imageControl.node.signalExpanded).toBeTruthy();
  });
});
