import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { getSelectedBlock } from './block';
import { isListBlock, changeDepth } from './list';

describe('isListBlock test suite', () => {
  it('should return true for ordered lists', () => {
    expect.assertions(1);
    const block = {
      getType: () => 'ordered-list-item',
    };
    expect(isListBlock(block)).toBeTruthy();
  });

  it('should return true for unordered lists', () => {
    expect.assertions(1);
    const block = {
      getType: () => 'unordered-list-item',
    };
    expect(isListBlock(block)).toBeTruthy();
  });

  it('should return false for any other block type lists', () => {
    expect.assertions(1);
    const block = {
      getType: () => 'header-one',
    };
    expect(isListBlock(block)).toBeFalsy();
  });

  it('should return false even is no block is passed', () => {
    expect.assertions(1);
    expect(isListBlock(undefined)).toBeFalsy();
  });
});

describe('changeDepth test suite', () => {
  it('should not change depth if block is not a list', () => {
    expect.assertions(1);
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    editorState = changeDepth(editorState, 1, 4);
    expect(getSelectedBlock(editorState).getDepth()).toEqual(0);
  });

  it('should not change depth if previous block is not a lost', () => {
    expect.assertions(2);
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1><ul><li>test</li></ul>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[1].get('key'),
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = changeDepth(editorState, 1, 4);
    expect(getSelectedBlock(editorState).getDepth()).toEqual(0);
    expect(contentBlocks[0].getDepth()).toEqual(0);
  });

  it('should not change depth if previous block list of same type', () => {
    expect.assertions(2);
    const { contentBlocks } = convertFromHTML(
      '<h1>aaaaaaaaaa</h1><ul><li>test</li><li>test</li></ul>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[2].get('key'),
      focusKey: contentBlocks[2].get('key'),
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = changeDepth(editorState, 1, 4);
    expect(getSelectedBlock(editorState).getDepth()).toEqual(1);
    expect(contentBlocks[0].getDepth()).toEqual(0);
  });
});
