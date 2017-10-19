import { Entity, RichUtils, EditorState, convertFromHTML, ContentState } from 'draft-js';
import {
  colors,
  fontSizes,
  fontFamilies,
  getCustomStyleMap,
  toggleCustomInlineStyle,
  customInlineStylesMap,
  getSelectionInlineStyle,
  getSelectionCustomInlineStyle,
  getSelectionEntity,
  getEntityRange,
} from './inline';
import { forEach, size } from './common';

describe('getSelectionInlineStyle test suite', () => {
  it('should correctly get inline styles', () => {
    expect.assertions(3);
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1><ul><li>test</li></ul>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = RichUtils.toggleInlineStyle(editorState, 'BOLD');

    expect(getSelectionInlineStyle(editorState).BOLD).toEqual(true);
    editorState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH');
    expect(getSelectionInlineStyle(editorState).STRIKETHROUGH).toEqual(true);

    editorState = RichUtils.toggleInlineStyle(editorState, 'CODE');
    expect(getSelectionInlineStyle(editorState).CODE).toEqual(true);
  });
});

describe('getSelectionEntity, getEntityRange test suite', () => {
  it('should return entity of selection', () => {
    expect.assertions(4);
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: 'www.testing.com' });
    editorState = RichUtils.toggleLink(editorState, updatedSelection, entityKey);
    expect(getSelectionEntity(editorState)).toEqual(entityKey);

    const entityRange = getEntityRange(editorState, entityKey);
    expect(entityRange.start).toEqual(0);
    expect(entityRange.end).toEqual(10);
    expect(entityRange.text).toEqual('aaaaaaaaaa');
  });

  it('should return undefined if entity is not applicable to whole seelction', () => {
    expect.assertions(4);
    const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    let updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 5,
    });
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: 'www.testing.com' });
    editorState = RichUtils.toggleLink(editorState, updatedSelection, entityKey);
    updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    expect(getSelectionEntity(editorState)).toBeUndefined();
    const entityRange = getEntityRange(editorState, entityKey);
    expect(entityRange.start).toEqual(0);
    expect(entityRange.end).toEqual(5);
    expect(entityRange.text).toEqual('aaaaa');
  });
});

describe('Inline: custom styles test suite', () => {
  it('should initialize colors', () => {
    expect.assertions(1);
    expect(colors instanceof Array).toBeFalsy();
  });
  it('should not initialize fontSizes', () => {
    expect.assertions(1);
    expect(fontSizes instanceof Array).toBeFalsy();
  });
  it('should initialize fontFamilies', () => {
    expect.assertions(1);
    expect(fontFamilies instanceof Array).toBeFalsy();
  });

  it('should initialize customInlineStylesMap with a map of inline styles', () => {
    expect.assertions(1);
    expect(customInlineStylesMap instanceof Object).toBeTruthy();
    forEach(customInlineStylesMap.color, (key, value) => {
      expect(value.color).toBeDefined();
    });
    forEach(customInlineStylesMap.bgcolor, (key, value) => {
      expect(value.backgroundColor).toBeDefined();
    });
  });
  it('should initializa customStyleMap with colors, bg-colors, fontsizes and fontFamilies', () => {
    expect.assertions(2);
    expect(getCustomStyleMap instanceof Function).toBeTruthy();
    expect(size(getCustomStyleMap())).toEqual(3);
  });
});

describe('getSelectionInlineStyle, toggleCustomInlineStyle test suite', () => {
  it('should correctly get color of selection', () => {
    expect.assertions(2);
    const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1><ul><li>test</li></ul>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(editorState, updatedSelection);
    editorState = toggleCustomInlineStyle(editorState, 'color', 'rgb(97,189,109)');
    expect(getSelectionCustomInlineStyle(editorState, ['COLOR']).COLOR).toEqual(
      'color-rgb(97,189,109)',
    );
    editorState = toggleCustomInlineStyle(editorState, 'bgcolor', 'rgb(97,189,109)');
    expect(getSelectionCustomInlineStyle(editorState, ['BGCOLOR']).BGCOLOR).toEqual(
      'bgcolor-rgb(97,189,109)',
    );
  });
});
