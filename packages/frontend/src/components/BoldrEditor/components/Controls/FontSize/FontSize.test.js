/* @flow */

import React from 'react';
import { mount } from 'enzyme';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import 'jest-styled-components';
import { Dropdown } from '../../Dropdown';
import defaultToolbar from '../../../core/config';
import ModalHandler from '../../../core/eventHandlers/modals';
import FontSizeControl from './FontSize';

describe('<FontSize />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(
        <FontSizeControl
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.fontSize}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have a dropdown child component well defined', () => {
    const control = mount(
      <FontSizeControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontSize}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.childAt(0).props().children.length).toBe(2);
    expect(control.childAt(0).props().onChange).toBeDefined();
    expect(control.childAt(0).type()).toBe(Dropdown);
  });
});
