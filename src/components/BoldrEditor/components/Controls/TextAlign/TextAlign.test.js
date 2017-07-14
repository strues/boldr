/* @flow */

import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../eventHandlers/modals';
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
    expect(control.children().length).toEqual(4);
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
    expect(control.childAt(0).children().length).toEqual(2);
  });

  it('should execute onChange when any of first any child elements is clicked', () => {
    const onChange = spy();
    const control = mount(
      <TextAlign
        onChange={onChange}
        editorState={editorState}
        config={defaultToolbar.textAlign}
        modalHandler={new ModalHandler()}
      />,
    );
    control.childAt(0).simulate('click');
    expect(onChange.calledOnce).toBeTruthy();
    control.childAt(1).simulate('click');
    expect(onChange.callCount, 2).toBeTruthy();
    control.childAt(2).simulate('click');
    expect(onChange.callCount, 3).toBeTruthy();
    control.childAt(3).simulate('click');
    expect(onChange.callCount, 4).toBeTruthy();
  });
});
