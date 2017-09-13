import { Modifier, EditorState } from 'draft-js';
import { getSelectedBlock } from './block';

const handlePastedText = (text, html, editorState, onChange) => {
  const selectedBlock = getSelectedBlock(editorState);
  if (selectedBlock && selectedBlock.type === 'code') {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    return true;
  }
  return false;
};
export default handlePastedText;
