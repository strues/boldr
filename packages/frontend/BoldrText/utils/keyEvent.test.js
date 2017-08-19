import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { getAllBlocks } from './block';
import handleNewLine from './keyEvent';

describe('handleNewLine: Enter KeyPress test suite', () => {
  it('should add new unstyles block if enter is pressed at the end of a styles block', () => {
    expect.assertions(2);
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    expect(getAllBlocks(editorState).size).toEqual(1);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 10,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = handleNewLine(editorState, {});
    expect(getAllBlocks(editorState).size).toEqual(2);
  });

  it('should do nothing if current block was UNSTYLED', () => {
    expect.assertions(2);
    const { contentBlocks } = convertFromHTML('<div>aaaaaaaaaa</div>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    expect(getAllBlocks(editorState).size).toEqual(1);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 10,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    expect(handleNewLine(editorState, {})).toBeUndefined();
  });
});

describe('handleNewLine: SHIFT + Enter KeyPress test suite', () => {
  const event = {
    which: 13,
    getModifierState: () => 'Shift',
  };
  it('should add new line id selection was collapsed', () => {
    expect.assertions(3);
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    expect(getAllBlocks(editorState).size).toEqual(1);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 5,
      focusOffset: 5,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = handleNewLine(editorState, event);
    expect(getAllBlocks(editorState).size).toEqual(1);
    expect(editorState.getCurrentContent().getPlainText().indexOf('\n') > 0).toBeTruthy();
  });

  it('should remove selected text', () => {
    expect.assertions(3);
    const { contentBlocks } = convertFromHTML('<div>aaaaaaaaaa</div>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    expect(getAllBlocks(editorState).size).toEqual(1);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 2,
      focusOffset: 8,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = handleNewLine(editorState, event);
    expect(getAllBlocks(editorState).get(0).getLength()).toEqual(5);
    expect(editorState.getCurrentContent().getPlainText().indexOf('\n') > 0).toBeTruthy();
  });
});
