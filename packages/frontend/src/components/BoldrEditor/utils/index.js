export {
  getSelectedBlocksMap,
  getSelectedBlocksList,
  getSelectedBlock,
  getAllBlocks,
  getSelectedBlocksType,
  removeSelectedBlocksStyle,
  getSelectionText,
  addLineBreakRemovingSelection,
  insertNewUnstyledBlock,
  clearEditorContent,
  setBlockData,
  getSelectedBlocksMetadata,
} from './block';

export {
  getEntityRange,
  getCustomStyleMap,
  toggleCustomInlineStyle,
  getSelectionEntity,
  extractInlineStyle,
  removeAllInlineStyles,
  getSelectionInlineStyle,
  getSelectionCustomInlineStyle,
} from './inline';
export { hasProperty, filter, mergeRecursive, forEach } from './common';
export { default as blockStyleFn } from './blockStyleFn';
export { default as handleNewLine } from './keyEvent';

export { isListBlock, changeDepth } from './list';
