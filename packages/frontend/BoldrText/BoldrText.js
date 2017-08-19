/* eslint-disable no-param-reassign, no-unused-expressions, no-return-assign */
// @flow
import React, { Component } from 'react';

import {
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  // $FlowIssue
} from 'draft-js';

import { convertToHTML, convertFromHTML } from 'draft-convert';

import Toolbar from './components/Toolbar';
import languages from './languages';
import {
  getBlockRendererFn,
  blockRenderMap,
  blockStyleFn,
  getCustomStyleMap,
  decorators,
} from './core/renderers';
import { getToHTMLConfig, getFromHTMLConfig } from './core/configs/convert';
import defaultOptions from './core/configs/options';

import type {
  OptionControls,
  OptionAddonControls,
  OptionMedia,
  OptionColors,
  OptionFontSize,
  OptionFontFamilies,
} from './core/configs/options';

const editorDecorators = new CompositeDecorator(decorators);
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export type Props = {
  initialContent: string | Object,
  contentFormat: string,
  onChange: Function,
  onHtmlChange: Function,
  onRawChange: Function,
  controls: OptionControls,
  height: number,
  media: OptionMedia,
  addonControls: OptionAddonControls,
  language?: string,
  colors: OptionColors,
  fontSizes: OptionFontSize,
  fontFamilies: OptionFontFamilies,
};

type State = {
  editorState: EditorState,
  editorProps: Object,
};

export default class BoldrText extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let initialEditorState;
    let { initialContent, contentFormat } = this.props;

    contentFormat = contentFormat || 'raw';
    initialContent = initialContent || '';

    if (!initialContent) {
      initialEditorState = EditorState.createEmpty(editorDecorators);
    } else {
      let convertedContent;

      if (contentFormat === 'html') {
        convertedContent = convertFromHTML(getFromHTMLConfig())(initialContent);
      } else if (contentFormat === 'raw') {
        convertedContent = convertFromRaw(initialContent);
      }

      initialEditorState = EditorState.createWithContent(convertedContent, editorDecorators);
    }
    // $FlowIssue
    this.readyForSync = true;

    this.state = {
      editorState: initialEditorState,
      editorProps: {},
    };
  }
  state: State;
  props: Props;

  onChange = (editorState: EditorState) => {
    this.setState({ editorState }, () => {
      clearTimeout(this.syncTimer);
      this.syncTimer = setTimeout(() => {
        const { onChange, onRawChange, onHtmlChange } = this.props;
        onChange && onChange(this.getContent());
        onHtmlChange && onHtmlChange(this.getHtmlContent());
        onRawChange && onRawChange(this.getRawContent());
      }, 300);
    });
  };

  getHtmlContent() {
    return this.getContent('html');
  }

  getRawContent() {
    return this.getContent('raw');
  }

  getContent(format: string) {
    format = format || this.props.contentFormat || 'raw';
    const contentState = this.getContentState();

    const colors = defaultOptions.colors;
    const fontSizes = defaultOptions.fontSizes;
    const fontFamilies = defaultOptions.fontFamilies;

    return format === 'html'
      ? convertToHTML(
          getToHTMLConfig({
            contentState,
            colors,
            fontSizes,
            fontFamilies,
          }),
        )(contentState)
      : convertToRaw(this.getContentState());
  }

  getContentState() {
    return this.getEditorState().getCurrentContent();
  }

  getEditorState = () => {
    return this.state.editorState;
  };

  getDraftInstance = () => {
    return (this: any).draftInstance;
  };

  setEditorProp(key: string, name: string) {
    const editorProps = {
      ...this.state.editorProps,
      [key]: name,
    };
    this.setState({ editorProps });
  }

  forceRender = () => {
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const newEditorState = EditorState.createWithContent(contentState, editorDecorators);

    this.setState({ editorState: newEditorState });
  };

  handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  render() {
    let {
      controls,
      height,
      media,
      addonControls,
      language,
      colors,
      fontSizes,
      fontFamilies,
    } = this.props;
    const contentState = this.state.editorState.getCurrentContent();

    media = { ...defaultOptions.media, ...media };
    controls = controls || defaultOptions.controls;
    addonControls = addonControls || defaultOptions.addonControls;
    language = languages[language] || languages[defaultOptions.language];
    colors = colors || defaultOptions.colors;
    fontSizes = fontSizes || defaultOptions.fontSizes;
    fontFamilies = fontFamilies || defaultOptions.fontFamilies;
    height = height || defaultOptions.height;

    if (!media.uploadFn) {
      media.video = false;
      media.audio = false;
    }

    const controlBarProps = {
      onChange: this.onChange,
      editorState: this.state.editorState,
      media,
      controls,
      contentState,
      language,
      addonControls,
      colors,
      fontSizes,
      fontFamilies,
    };

    const blockRendererFn = getBlockRendererFn({
      onChange: this.onChange,
      editorState: this.state.editorState,
      getEditorState: this.getEditorState,
      contentState: contentState,
      language: language,
      forceRender: this.forceRender,
      setEditorProp: this.setEditorProp.bind(this),
    });

    const editorProps = {
      ref: instance => ((this: any).draftInstance = instance),
      editorState: this.state.editorState,
      handleKeyCommand: this.handleKeyCommand,
      onChange: this.onChange,
      customStyleMap: getCustomStyleMap({ colors, fontSizes, fontFamilies }),
      blockRenderMap: extendedBlockRenderMap,
      blockStyleFn: blockStyleFn,
      blockRendererFn: blockRendererFn,
      ...this.state.editorProps,
    };

    return (
      <div className="be-container">
        <Toolbar {...controlBarProps} />
        <div className="be-content-wrapper" style={{ height: height || defaultOptions.height }}>
          <Editor {...editorProps} />
        </div>
      </div>
    );
  }
}
