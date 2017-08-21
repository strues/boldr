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
  const breakoutBlockType = defaults.breakoutBlockType;
  const breakoutBlocks = defaults.breakoutBlocks;
  const doubleBreakoutBlocks = defaults.doubleBreakoutBlocks;
  const currentBlockType = RichUtils.getCurrentBlockType(editorState);
  const isSingleBreakoutBlock = breakoutBlocks.indexOf(currentBlockType) > -1;
  const isDoubleBreakoutBlock = doubleBreakoutBlocks.indexOf(currentBlockType) > -1;
  if (selection.isCollapsed()) {
    if (isSingleBreakoutBlock || isDoubleBreakoutBlock) {
      console.log(isSingleBreakoutBlock || isDoubleBreakoutBlock);
      const contentState = editorState.getCurrentContent();
      const currentBlock = contentState.getBlockForKey(selection.getEndKey());
      const endOffset = selection.getEndOffset();
      const atEndOfBlock = endOffset === currentBlock.getLength();
      const atStartOfBlock = endOffset === 0;
      if (
        (atEndOfBlock && isSingleBreakoutBlock) ||
        (atStartOfBlock && isSingleBreakoutBlock) ||
        (atStartOfBlock && !currentBlock.getLength())
      ) {
        const emptyBlockKey = genKey();
        const emptyBlock = new ContentBlock({
          key: emptyBlockKey,
          text: '',
          type: breakoutBlockType,
          characterList: List(),
          depth: 0,
        });
        const blockMap = contentState.getBlockMap();
        // Split the blocks
        const blocksBefore = blockMap.toSeq().takeUntil(function(v) {
          return v === currentBlock;
        });

        const blocksAfter = blockMap
          .toSeq()
          .skipUntil(function(v) {
            return v === currentBlock;
          })
          .rest();

        let augmentedBlocks;
        let focusKey;
        // Choose which order to apply the augmented blocks in depending
        // on whether we’re at the start or the end
        if (atEndOfBlock) {
          if (isDoubleBreakoutBlock) {
            // Discard Current as it was blank
            augmentedBlocks = [[emptyBlockKey, emptyBlock]];
          } else {
            // Current first, empty block afterwards
            augmentedBlocks = [[currentBlock.getKey(), currentBlock], [emptyBlockKey, emptyBlock]];
          }
          focusKey = emptyBlockKey;
        } else {
          // Empty first, current block afterwards
          augmentedBlocks = [[emptyBlockKey, emptyBlock], [currentBlock.getKey(), currentBlock]];
          focusKey = currentBlock.getKey();
        }
        // Join back together with the current + new block
        const newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
        const newContentState = contentState.merge({
          blockMap: newBlocks,
          selectionBefore: selection,
          selectionAfter: selection.merge({
            anchorKey: focusKey,
            anchorOffset: 0,
            focusKey: focusKey,
            focusOffset: 0,
            isBackward: false,
          }),
        });
        // Set the state
        setEditorState(EditorState.push(editorState, newContentState, 'split-block'));
        return 'handled';
      }
    }
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
