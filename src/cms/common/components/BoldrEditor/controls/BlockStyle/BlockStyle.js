/* @flow */
import React from 'react';
import StyleButton from '../StyleButton/StyleButton';
import { BLOCK_CONTROLS, BLOCK_TYPES } from '../helpers';

type Props = {
  editorState: Object,
  onToggle: Function,
  controls: Array<BLOCK_CONTROLS>,
  display?: 'block' | 'inline',
};

const BlockStyleControls = (props: Props) => {
  const { controls, display, editorState, onToggle } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="DraftJSEditor-controls" style={ { display } }>
      {
        BLOCK_TYPES.map(type => {
          if (controls.indexOf(type.label) !== -1) {
            return (
              <StyleButton
                key={ type.label }
                active={ type.style === blockType }
                label={ type.label }
                icon={ type.icon }
                onToggle={ onToggle }
                style={ type.style }
              />
            );
          }
        },
      )
    }
    </div>
  );
};

export default BlockStyleControls;
