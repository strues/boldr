/* eslint-disable new-cap */
/* @flow */
import {
  EditorState,
  RichUtils,
  Modifier,
  ContentBlock,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import { OrderedMap, List, Map } from 'immutable';

/**
 * Function returns collection of currently selected blocks.
 * @param  {EditorState} editorState the editorState Object
 * @return {OrderedMap}             selected block ordered map
 */
export function getSelectedBlocksMap(editorState: EditorState): OrderedMap<any, any> {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]]);
}

/**
 * Function returns collection of currently selected blocks.
 * @param  {EditorState} editorState the editorState Object
 * @return {List}             the selected block map in list form
 */
export function getSelectedBlocksList(editorState: EditorState): List<any> {
  return getSelectedBlocksMap(editorState).toList();
}

/**
 * Function returns the first selected block.
 * @param  {EditorState} editorState  the editorState Object
 * @return {ContentBlock}             the selected block
 */
export function getSelectedBlock(editorState: EditorState): ContentBlock {
  if (editorState) {
    return getSelectedBlocksList(editorState).get(0);
  }
  return undefined;
}

/**
 * Function returns list of all blocks in the editor.
 * @param  {EditorState} editorState the editorState Object
 * @return {List}            immutable list containing all blocks
 */
export function getAllBlocks(editorState: EditorState): List<any> {
  if (editorState) {
    return editorState.getCurrentContent().getBlockMap().toList();
  }
  return new List();
}

/**
 * If all currently selected blocks are of same type the function will return their type,
 * else it will return empty string.
 * @param  {EditorState} editorState the editorState Object
 * @return {List|ContentBlock|OrderedMap}        the selected block's type
 */
export function getSelectedBlocksType(editorState: EditorState): any {
  const blocks = getSelectedBlocksList(editorState);
  const hasMultipleBlockTypes = blocks.some(block => block.type !== blocks.get(0).type);
  if (!hasMultipleBlockTypes) {
    return blocks.get(0).type;
  }
  return undefined;
}

/**
 * Function will change block style to unstyled for selected blocks.
 * RichUtils.tryToRemoveBlockStyle does not workd for blocks of length greater than 1.
 * @param  {EditorState} editorState the editorState Object
 * @return {EditorState}             updated editorState without styles
 */
export function removeSelectedBlocksStyle(editorState: EditorState): EditorState {
  const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
  return EditorState.push(editorState, newContentState, 'change-block-type');
}

/**
 * Function will return currently selected text in the editor.
 * @param  {EditorState} editorState the editorState Object
 * @return {string}             the selected text string
 */
export function getSelectionText(editorState: EditorState): string {
  let selectedText = '';
  const currentSelection = editorState.getSelection();
  let start = currentSelection.getAnchorOffset();
  let end = currentSelection.getFocusOffset();
  const selectedBlocks = getSelectedBlocksList(editorState);
  if (selectedBlocks.size > 0) {
    if (currentSelection.getIsBackward()) {
      const temp = start;
      start = end;
      end = temp;
    }
    for (let i = 0; i < selectedBlocks.size; i += 1) {
      const blockStart = i === 0 ? start : 0;
      const blockEnd = i === selectedBlocks.size - 1 ? end : selectedBlocks.get(i).getText().length;
      selectedText += selectedBlocks.get(i).getText().slice(blockStart, blockEnd);
    }
  }
  return selectedText;
}

/**
 * Function will handle followind keyPress scenario:
 *       case Shift+Enter, select not collapsed ->
 *          selected text will be removed and line break will be inserted.
 * @param  {EditorState} editorState the editorState Object
 * @return {EditorState}             updated editorState without styles
 */
export function addLineBreakRemovingSelection(editorState: EditorState): EditorState {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  let newContent = Modifier.removeRange(content, selection, 'forward');
  const fragment = newContent.getSelectionAfter();
  const block = newContent.getBlockForKey(fragment.getStartKey());
  newContent = Modifier.insertText(
    newContent,
    fragment,
    '\n',
    block.getInlineStyleAt(fragment.getStartOffset()),
    null,
  );
  return EditorState.push(editorState, newContent, 'insert-fragment');
}

/**
 * Function will inset a new unstyled block.
 * @param  {EditorState} editorState the editorState Object
 * @return {EditorState}             updated editorState without styles
 */
export function insertNewUnstyledBlock(editorState: EditorState): EditorState {
  const newContentState = Modifier.splitBlock(
    editorState.getCurrentContent(),
    editorState.getSelection(),
  );
  const newEditorState = EditorState.push(editorState, newContentState, 'split-block');
  return removeSelectedBlocksStyle(newEditorState);
}

/**
 * Function will clear all content from the editor.
 * @param  {EditorState} editorState the editorState Object
 * @return {EditorState}             updated editorState without styles
 */
export function clearEditorContent(editorState: EditorState): EditorState {
  const blocks = editorState.getCurrentContent().getBlockMap().toList();
  const updatedSelection = editorState.getSelection().merge({
    anchorKey: blocks.first().get('key'),
    anchorOffset: 0,
    focusKey: blocks.last().get('key'),
    focusOffset: blocks.last().getLength(),
  });
  const newContentState = Modifier.removeRange(
    editorState.getCurrentContent(),
    updatedSelection,
    'forward',
  );
  return EditorState.push(editorState, newContentState, 'remove-range');
}

/**
 * Function will add block level meta-data.
 * @param {EditorState} editorState   the editorState Object
 * @param {Object}      data          input from the user
 * @returns {Function}                the updated editor state
 */
export function setBlockData(editorState: EditorState, data: Object): EditorState {
  const newContentState = Modifier.setBlockData(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    data,
  );
  return EditorState.push(editorState, newContentState, 'change-block-data');
}

/**
 * Function will return currently selected blocks meta data.
 * @param  {EditorState} editorState    the editorState Object
 * @return {Map}                        immutable map of selected block meta
 */
export function getSelectedBlocksMetadata(editorState: EditorState): Map<*, *> {
  // $FlowIssue
  let metaData = new Map({});
  const selectedBlocks = getSelectedBlocksList(editorState);
  if (selectedBlocks && selectedBlocks.size > 0) {
    for (let i = 0; i < selectedBlocks.size; i += 1) {
      const data = selectedBlocks.get(i).getData();
      if (!data || data.size === 0) {
        metaData = metaData.clear();
        break;
      }
      if (i === 0) {
        metaData = data;
      } else {
        // eslint-disable-next-line
        metaData.forEach((value, key) => {
          if (!data.get(key) || data.get(key) !== value) {
            metaData = metaData.delete(key);
          }
        });
        if (metaData.size === 0) {
          metaData = metaData.clear();
          break;
        }
      }
    }
  }
  return metaData;
}
const newBlockRenderMap = Map({
  code: {
    element: 'pre',
  },
});

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(newBlockRenderMap);
