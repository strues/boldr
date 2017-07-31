/* @flow */

import React from 'react';
import { mount } from 'enzyme';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../eventHandlers/modals';
import Link from './Link';

describe('<Link />', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(
      mount(
        <Link
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.link}
          modalHandler={new ModalHandler()}
        />,
      )
        .html()
        .startsWith('<div'),
    ).toBe(true);
  });

  it('should have 2 child elements by default', () => {
    const control = mount(
      <Link
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(2);
  });

  it('should have no value for state variable link default', () => {
    const control = mount(
      <Link
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
      />,
    );
    const linkControl = control.find('Link');
    expect(linkControl.node.state.expanded).toBeFalsy();
    expect(linkControl.node.state.link, undefined).toBeUndefined();
  });
});
