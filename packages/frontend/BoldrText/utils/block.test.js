import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import {
  getAllBlocks,
  getSelectedBlock,
  removeSelectedBlocksStyle,
  getSelectedBlocksType,
  clearEditorContent,
  getSelectedBlocksList,
  getSelectionText,
  insertNewUnstyledBlock,
  addLineBreakRemovingSelection,
} from './block';

test('should add new unstyles block when insertNewUnstyledBlock is called', () => {
  expect.assertions(1);
  const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  let editorState = EditorState.createWithContent(contentState);
  const updatedSelection = editorState.getSelection().merge({
    anchorOffset: 0,
    focusOffset: 10,
  });
  editorState = EditorState.acceptSelection(editorState, updatedSelection);
  editorState = insertNewUnstyledBlock(editorState);
  expect(getAllBlocks(editorState).size).toEqual(2);
});

describe('getSelectedBlocksList, getSelectedBlocksMap, getSelectedBlock, getAllBlocks test suite', () => {
  it('should correctly return list of selected blocks', () => {
    expect.assertions(6);
    const { contentBlocks } = convertFromHTML(
      '<h1>aaaaaaaaaa</h1><ul><li>test</li></ul><h1>aaaaaaaaaa3</h1><h1>aaaaaaaaaa</h1>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[2].get('key'),
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    const selectedBlockList = getSelectedBlocksList(editorState);
    const selectedBlockMap = getSelectedBlocksList(editorState);
    expect(selectedBlockList.size).toEqual(2);
    expect(selectedBlockMap.count()).toEqual(2);
    expect(getAllBlocks(editorState).size).toEqual(4);
    expect(getSelectedBlock(editorState).get('key')).toEqual(contentBlocks[1].get('key'));
    // assert.equal(getSelectedBlock(editorState).get('key'), contentBlocks[1].get('key'));
    expect(selectedBlockList.get(0).get('text')).toEqual('test');
    expect(selectedBlockList.get(1).get('text')).toEqual('aaaaaaaaaa3');
  });
});

describe('getSelectedBlocksType test suite', () => {
  it('should return correct block-type', () => {
    expect.assertions(1);
    const { contentBlocks } = convertFromHTML(
      '<h1>aaaaaaaaaa</h1><h1>aaaaaaaaaa3</h1><h1>aaaaaaaaaa</h1><ul><li>test</li></ul>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[0].get('key'),
      focusKey: contentBlocks[2].get('key'),
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    expect(getSelectedBlocksType(editorState)).toEqual('header-one');
  });
  it('should return undefined in blocks in selection have different types', () => {
    expect.assertions(1);
    const { contentBlocks } = convertFromHTML(
      '<h1>aaaaaaaaaa</h1><h1>aaaaaaaaaa3</h1><h1>aaaaaaaaaa</h1><ul><li>test</li></ul>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[0].get('key'),
      focusKey: contentBlocks[3].get('key'),
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    expect(getSelectedBlocksType(editorState)).toBeUndefined();
  });
});

describe('removeSelectedBlocksStyle test suite', () => {
  it('should remove style of selected blocks', () => {
    expect.assertions(1);
    const { contentBlocks } = convertFromHTML('<ul><li>test</li><li>li-1</li></ul><h1>header</h1>');
    // Following hack was needed to create a block of 0 length.
    // As convertFromHTML, does not allow to create block of length 0.
    const blankBlock = contentBlocks[1].merge({
      text: '',
    });
    contentBlocks[1] = blankBlock;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[1].get('key'),
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = removeSelectedBlocksStyle(editorState);
    expect(getSelectedBlocksType(editorState)).toEqual('unstyled');
  });
});

describe('insertNewUnstyledBlock test suite', () => {
  it('should insert an unstyled block', () => {
    expect.assertions(2);
    const { contentBlocks } = convertFromHTML('<h1>testing1</h1><h1>testing2</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[1].get('key'),
      anchorOffset: 8,
      focusOffset: 8,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    expect(getAllBlocks(editorState).size).toEqual(2);
    editorState = insertNewUnstyledBlock(editorState);
    expect(getAllBlocks(editorState).size).toEqual(3);
  });
});

describe('getSelectionText test suite', () => {
  it('should get text for current selection', () => {
    expect.assertions(1);
    const { contentBlocks } = convertFromHTML('<h1>testing1</h1><h1>testing2</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[0].get('key'),
      focusKey: contentBlocks[1].get('key'),
      anchorOffset: 0,
      focusOffset: 8,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    expect(getSelectionText(editorState)).toEqual('testing1testing2');
  });
  it('should not include text for blocsk not selected', () => {
    expect.assertions(1);
    const { contentBlocks } = convertFromHTML(
      '<h1>testing1</h1><h1>testing2</h1><h1>testing3</h1>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[0].get('key'),
      focusKey: contentBlocks[1].get('key'),
      anchorOffset: 0,
      focusOffset: 8,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    expect(getSelectionText(editorState)).toEqual('testing1testing2');
  });
});

describe('addLineBreakRemovingSelection test suite', () => {
  it('should insert a line break and remove selected text', () => {
    expect.assertions(1);
    const { contentBlocks } = convertFromHTML('<h1>testing1</h1><h1>testing2</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[1].get('key'),
      anchorOffset: 3,
      focusOffset: 5,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = addLineBreakRemovingSelection(editorState);
    expect(getAllBlocks(editorState).get(1).get('text')).toEqual('tes\nng2');
  });
});

describe('clearEditorContent test suite', () => {
  it('should clear editor content', () => {
    expect.assertions(1);
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1><h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    editorState = clearEditorContent(editorState);
    expect(editorState.getCurrentContent().getPlainText().length).toEqual(0);
  });
});
