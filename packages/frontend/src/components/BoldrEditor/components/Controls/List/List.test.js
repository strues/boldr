/* @flow */

import React from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { spy } from 'sinon';
import { mount } from 'enzyme';

import defaultToolbar from '../../../config/defaultToolbar';
import List from './List';

describe('<List />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(<List onChange={() => {}} editorState={editorState} config={defaultToolbar.list} />)
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have 2 child elements by default', () => {
    const control = mount(
      <List onChange={() => {}} editorState={editorState} config={defaultToolbar.list} />,
    );
    expect(control.children().length).toEqual(2);
  });

  it('should have 1 child elements if inDropdown is true', () => {
    const control = mount(
      <List
        onChange={() => {}}
        editorState={editorState}
        config={{ ...defaultToolbar.list, inDropdown: true }}
      />,
    );
    expect(control.children().length).toEqual(2);
    expect(control.childAt(0).children().length).toEqual(1);
  });

  it('should execute onChange when any of first any child elements is clicked', () => {
    const onChange = spy();
    const control = mount(
      <List onChange={onChange} editorState={editorState} config={defaultToolbar.list} />,
    );
    control.childAt(0).simulate('click');
    expect(onChange.calledOnce).toBeTruthy();
  });
});
