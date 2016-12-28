/* @flow */
import React from 'react';
import StyleButton from '../StyleButton/StyleButton';
import { INLINE_STYLES, INLINE_CONTROLS } from '../helpers';

type Props = {
  editorState: Object,
  onToggle: Function,
  controls: Array<INLINE_CONTROLS>,
  display?: 'block' | 'inline',
};
const InlineStyleControls = (props: Props) => {
  const { editorState, onToggle, controls, display } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="be-controls__text-style" role="group" style={ { display } }>
      {
        INLINE_STYLES.map(type => {
          if (controls.indexOf(type.label) !== -1) {
            return (
              <StyleButton
                key={ type.label }
                active={ currentStyle.has(type.style) }
                icon={ type.icon }
                label={ type.label }
                onToggle={ onToggle }
                style={ type.style }
              />
            );
          }
        })
      }
    </div>
  );
};

export default InlineStyleControls;
