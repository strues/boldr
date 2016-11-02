export type Props = {
  editorState?: Object,
  onToggle?: Function,
  controls?: boolean | Array<INLINE_CONTROLS>,
  display?: 'block' | 'inline',
};

import React, { PropTypes } from 'react';
import StyleButton from '../StyleButton/StyleButton';
import { INLINE_STYLES, INLINE_CONTROLS } from '../helpers';

const InlineStyleControls = ({ controls, display, editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="btn-group" role="group" style={ { display } }>
      {
        INLINE_STYLES.map(type => {
          if (controls.indexOf(type.label) !== -1) {
            return (
              <StyleButton key={ type.label }
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
