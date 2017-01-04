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

function BlockStyleControls(props: Props) {
  const { controls, display, editorState, onToggle } = props;
  const selection = editorState.getSelection();

  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="be-controls__text-format" style={ { display } }>
      {
        BLOCK_TYPES.map(block => {
          if (controls.indexOf(block.label) !== -1) {
            return (
              <StyleButton
                key={ block.label }
                active={ block.style === blockType }
                label={ block.label }
                icon={ block.icon }
                onToggle={ onToggle }
                style={ block.style }
              />
            );
          }
        },
      )
    }
    </div>
  );
}

export default BlockStyleControls;
