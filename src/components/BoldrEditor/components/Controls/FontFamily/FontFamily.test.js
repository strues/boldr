/* @flow */

import React from 'react';
import { mount } from 'enzyme';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';

import { Dropdown } from '../../Dropdown';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../eventHandlers/modals';
import FontFamily from './FontFamily';

describe('<FontFamily />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(
        <FontFamily
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.fontFamily}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have a dropdown child component well defined', () => {
    const control = mount(
      <FontFamily
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontFamily}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.childAt(0).props().children.length, 2).toBeTruthy();
    expect(control.childAt(0).props().onChange).toBeDefined();
    expect(control.childAt(0).type(), Dropdown).toBeTruthy();
  });
});