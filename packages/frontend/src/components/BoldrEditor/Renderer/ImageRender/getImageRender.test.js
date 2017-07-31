/* @flow */

import React from 'react';
import { shallow } from 'enzyme';
import { getAllBlocks } from 'draftjs-utils';
import { convertFromHTML, AtomicBlockUtils, ContentState, EditorState } from 'draft-js';

import getImageRender from './getImageRender';

describe('ImageRenderer', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);
  const entityKey = contentState
    .createEntity('IMAGE', 'MUTABLE', { src: 'testing' })
    .getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

  it('should have a div when rendered', () => {
    const Image = getImageRender({
      isReadOnly: () => false,
      isImageAlignmentEnabled: () => true,
    });
    expect(
      shallow(<Image block={getAllBlocks(newEditorState).get(1)} contentState={contentState} />)
        .node.type,
    ).toEqual('span');
  });

  it('should have state initialized correctly', () => {
    const Image = getImageRender({
      isReadOnly: () => false,
      isImageAlignmentEnabled: () => true,
    });
    const control = shallow(
      <Image block={getAllBlocks(newEditorState).get(1)} contentState={contentState} />,
    );
    expect(control.state().hovered).toBeFalsy();
  });

  it('should have 1 child element by default', () => {
    const Image = getImageRender({
      isReadOnly: () => false,
      isImageAlignmentEnabled: () => true,
    });
    const control = shallow(
      <Image block={getAllBlocks(newEditorState).get(1)} contentState={contentState} />,
    );
    expect(control.children().length).toEqual(1);
  });
});
