/* eslint-disable complexity */
/* @flow */
import { genKey, ContentBlock, EditorState, RichUtils } from 'draft-js';
import { List } from 'immutable';
import {
  insertNewUnstyledBlock,
  removeSelectedBlocksStyle,
  addLineBreakRemovingSelection,
} from './block';
import { isListBlock, changeListDepth } from './list';

const defaults = {
  breakoutBlockType: 'unstyled',
  breakoutBlocks: [
    'header-one',
    'header-two',
    'header-three',
    'header-four',
    'header-five',
    'header-six',
  ],
  doubleBreakoutBlocks: ['blockquote', 'unordered-list-item', 'ordered-list-item', 'code-block'],
};
/**
* Function will handle followind keyPress scenarios when Shift key is not pressed.
*/
function handleHardNewlineEvent(editorState: EditorState): EditorState {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    if (
      !isListBlock(block) &&
      block.getType() !== 'unstyled' &&
      block.getLength() === selection.getStartOffset()
    ) {
      return insertNewUnstyledBlock(editorState);
    } else if (isListBlock(block) && block.getLength() === 0) {
      const depth = block.getDepth();
      if (depth === 0) {
        return removeSelectedBlocksStyle(editorState);
      }
      if (depth > 0) {
        return changeListDepth(editorState, -1, depth);
      }
    }
  }
  return undefined;
}

/**
* Function to check is event was soft-newline
* taken from : https://github.com/facebook/draft-js/blob/master/src/component/utils/isSoftNewlineEvent.js
*/
function isSoftNewlineEvent(event: Object): boolean {
  return (
    event.which === 13 &&
    (event.getModifierState('Shift') ||
      event.getModifierState('Alt') ||
      event.getModifierState('Control'))
  );
}

/**
* The function will handle keypress 'Enter' in editor. Following are the scenarios:
*
* 1. Shift+Enter, Selection Collapsed -> line break will be inserted.
* 2. Shift+Enter, Selection not Collapsed ->
*      selected text will be removed and line break will be inserted.
* 3. Enter, Selection Collapsed ->
*      if current block is of type list and length of block is 0
*      a new list block of depth less that current one will be inserted.
* 4. Enter, Selection Collapsed ->
*      if current block not of type list, a new unstyled block will be inserted.
*/
export default function handleNewLine(
  editorState: EditorState,
  event: SyntheticEvent<>,
): EditorState {
  if (isSoftNewlineEvent(event)) {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return RichUtils.insertSoftNewline(editorState);
    }
    return addLineBreakRemovingSelection(editorState);
  }
  return handleHardNewlineEvent(editorState);
}
