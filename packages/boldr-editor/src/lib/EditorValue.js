/* @flow */
import { ContentState, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import type { DraftDecoratorType as Decorator } from 'draft-js/lib/DraftDecoratorType';

type StringMap = {[key: string]: string};

export default class EditorValue {
  _editorState: EditorState;
  _cache: StringMap;

  constructor(editorState: EditorState, cache: StringMap = {}) {
    this._cache = cache;
    this._editorState = editorState;
  }

  getEditorState(): EditorState {
    return this._editorState;
  }

  setEditorState(editorState: EditorState): EditorValue {
    return (this._editorState === editorState) ?
      this :
      new EditorValue(editorState);
  }

  toString(format: string): string {
    const fromCache = this._cache[format];
    if (fromCache !== null) {
      return fromCache;
    }
    return (this._cache[format] = toString(this.getEditorState(), format));
  }

  setContentFromString(markup: string, format: string): EditorValue {
    const editorState = EditorState.push(
      this._editorState,
      fromString(markup, format),
      'secondary-paste',
    );
    return new EditorValue(editorState, { [format]: markup });
  }

  static createEmpty(decorator: ?Decorator): EditorValue {
    const editorState = EditorState.createEmpty(decorator);
    return new EditorValue(editorState);
  }

  static createFromState(editorState: EditorState): EditorValue {
    return new EditorValue(editorState);
  }

  static createFromString(markup: string, format: string, decorator: ?Decorator): EditorValue {
    const contentState = fromString(markup, format);
    const editorState = EditorState.createWithContent(contentState, decorator);
    return new EditorValue(editorState, { [format]: markup });
  }
}

function toString(editorState: EditorState, format: string): string {
  const contentState = editorState.getCurrentContent();
  switch (format) {
    case 'html': {
      return stateToHTML(contentState);
    }
    // case 'markdown': {
    //   return stateToMarkdown(contentState);
    // }
    default: {
      throw new Error(`Format not supported: ${format}`);
    }
  }
}

function fromString(markup: string, format: string): ContentState {
  switch (format) {
    case 'html': {
      return stateFromHTML(markup);
    }
    // case 'markdown': {
    //   return stateFromMarkdown(markup);
    // }
    default: {
      throw new Error(`Format not supported: ${format}`);
    }
  }
}
