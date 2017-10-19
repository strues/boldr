/* @flow */

import React from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import ModalHandler from '../../../core/eventHandlers/modals';
import defaultToolbar from '../../../core/config';

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

  it('should have 1 child elements by default', () => {
    const control = mount(
      <Inline
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.inline}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).toEqual(1);
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
