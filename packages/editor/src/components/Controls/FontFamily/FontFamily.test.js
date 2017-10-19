/* @flow */

import React from 'react';
import { mount } from 'enzyme';

import { EditorState, convertFromHTML, ContentState } from 'draft-js';

import { Dropdown } from '../../Dropdown';
import defaultToolbar from '../../../core/config';
import ModalHandler from '../../../core/eventHandlers/modals';
import FontFamily from './FontFamily';

describe('<FontFamily />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    const wrapper = mount(
      <FontFamily
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontFamily}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(wrapper.find('.be-ctrl__group').length).toBe(1);
  });

  // it('should have a dropdown child component well defined', () => {
  //   const control = mount(
  //     <FontFamily
  //       onChange={() => {}}
  //       editorState={editorState}
  //       config={defaultToolbar.fontFamily}
  //       modalHandler={new ModalHandler()}
  //     />,
  //   );
  //   expect(control.childAt(0).props().children.length).toBe(2);
  //   expect(control.childAt(0).props().onChange).toBeDefined();
  // });
});
