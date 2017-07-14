/* @flow */

import React from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../eventHandlers/modals';

import Inline from './Inline';

describe('<Inline />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(
        <Inline
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.inline}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have 5 child elements by default', () => {
    const control = mount(
      <Inline
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.inline}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(7);
  });

  it('should have 1 child elements if inDropdown is true', () => {
    const control = mount(
      <Inline
        onChange={() => {}}
        editorState={editorState}
        config={{ ...defaultToolbar.inline, inDropdown: true }}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(1);
    expect(control.childAt(0).children().length).toEqual(2);
  });

  it('should execute onChange when child elements are clicked', () => {
    const onChange = spy();
    const control = mount(
      <Inline
        onChange={onChange}
        editorState={editorState}
        config={defaultToolbar.inline}
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
    control.childAt(4).simulate('click');
    expect(onChange.callCount, 5).toBeTruthy();
  });

  it('should have false value for all rich styles in state by default', () => {
    const control = shallow(
      <Inline
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.inline}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.state().currentStyles.BOLD).toBeFalsy();
    expect(control.state().currentStyles.ITALIC).toBeFalsy();
    expect(control.state().currentStyles.UNDERLINE).toBeFalsy();
    expect(control.state().currentStyles.STRIKETHROUGH).toBeFalsy();
    expect(control.state().currentStyles.MONOSPACE).toBeFalsy();
  });
});
