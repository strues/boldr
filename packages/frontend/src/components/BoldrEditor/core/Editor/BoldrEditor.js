/* @flow weak*/
/* eslint-disable max-lines, flowtype/no-types-missing-file-annotation, react/no-array-index-key */
import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js';
import uniqueId from 'lodash/uniqueId';
import cN from 'classnames';
// $FlowIssue
import type { ContentBlock } from 'draft-js';
import { FocusHandler, KeyDownHandler, SuggestionHandler } from '../eventHandlers';
import {
  handleNewLine,
  getCustomStyleMap,
  extractInlineStyle,
  getSelectedBlocksType,
  blockStyleFn,
  hasProperty,
  filter,
  mergeRecursive,
} from '../../utils';

import * as Controls from '../../components/Controls';

import { getLinkDecorator, getHashtagDecorator } from '../decorators';

import getBlockRenderFunc from '../blockRender';
import defaultToolbar from '../../config/defaultToolbar';
import { EDITOR_PROPS, ENTITY_TYPE, BLOCK_TYPE, INLINE_STYLE } from '../constants';

export type ChangeHandler = (value: any) => any;

export type Props = {
  onChange: ?ChangeHandler,
  onEditorStateChange: ?Function,
  onContentStateChange: ?Function,
  defaultContentState: ?Object,
  contentState: ?Object,
  editorState: Object,
  defaultEditorState: ?Object,
  toolbarOnFocus: boolean,
  spellCheck?: boolean,
  toolbar: Object,
  toolbarCustomButtons: ?Array<any>,
  toolbarClassName?: string,
  toolbarHidden?: boolean,
  editorClassName?: string,
  wrapperClassName?: string,
  toolbarStyle: ?Object,
  editorStyle: ?Object,
  wrapperStyle: ?Object,
  uploadCallback: ?Function,
  onFocus: ?Function,
  onBlur: ?Function,
  onTab: ?Function,
  mention: ?Object,
  hashtag: ?Object,
  readOnly?: boolean,
  placeholder?: string,
  ariaLabel?: string,
  wrapperId?: string,
  customBlockRenderFunc: ?Function,
  customDecorators: ?Array<any>,
};
export type State = {
  editorState: Object,
  editorFocused: boolean,
  toolbar: Object,
};

type BlockRendererFunc = (block: ContentBlock) => ?string;

export default class BoldrEditor extends Component {
  static defaultProps = {
    toolbarOnFocus: false,
    toolbarHidden: false,
    stripPastedStyles: false,
    wrapperId: `boldredit-wrapper-${uniqueId()}`,
    customDecorators: [],
  };

  constructor(props) {
    super(props);
    const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    this.state = {
      // eslint-disable-next-line
      editorState: {},
      editorFocused: false,
      toolbar,
    };

    // $FlowIssue
    this.focusHandler = new FocusHandler();
    this.blockRendererFn = getBlockRenderFunc(
      {
        isReadOnly: this.isReadOnly,
        isImageAlignmentEnabled: this.isImageAlignmentEnabled,
        getEditorState: this.getEditorState,
        onChange: this.handleChange,
      },
      props.customBlockRenderFunc,
    );
    // $FlowIssue
    this.editorProps = this.filterEditorProps(props);
    // $FlowIssue
    this.customStyleMap = getCustomStyleMap();
  }

  state: State;

  componentWillMount(): void {
    // $FlowIssue
    this.compositeDecorator = this.getCompositeDecorator();
    const editorState = this.createEditorState(this.compositeDecorator);
    extractInlineStyle(editorState);
    this.setState({ editorState });
  }

  componentWillReceiveProps(props) {
    const newState = {};
    if (this.props.toolbar !== props.toolbar) {
      const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
      newState.toolbar = toolbar;
    }

    if (hasProperty(props, 'editorState') && this.props.editorState !== props.editorState) {
      if (props.editorState) {
        newState.editorState = EditorState.set(props.editorState, {
          // $FlowIssue
          decorator: this.compositeDecorator,
        });
      } else {
        // $FlowIssue
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    } else if (
      hasProperty(props, 'contentState') &&
      this.props.contentState !== props.contentState
    ) {
      if (props.contentState) {
        const newEditorState = this.changeEditorState(props.contentState);
        if (newEditorState) {
          newState.editorState = newEditorState;
        }
      } else {
        // $FlowIssue
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    }
    if (
      newState.editorState &&
      (this.props.editorState && this.props.editorState.getCurrentContent().getBlockMap().size) !==
        (newState.editorState && newState.editorState.getCurrentContent().getBlockMap().size)
    ) {
      extractInlineStyle(newState.editorState);
    }

    this.setState(newState);
    // $FlowIssue
    this.editorProps = this.filterEditorProps(props);
    // $FlowIssue
    this.customStyleMap = getCustomStyleMap();
  }

  props: Props;
  blockRendererFn: BlockRendererFunc;

  onEditorBlur: Function = (): void => {
    this.setState({
      editorFocused: false,
    });
  };

  handleEditorFocus: Function = (event): void => {
    const { onFocus } = this.props;
    this.setState({
      editorFocused: true,
    });
    if (onFocus && this.focusHandler.isEditorFocused()) {
      onFocus(event);
    }
  };

  onEditorMouseDown: Function = (): void => {
    this.focusHandler.onEditorMouseDown();
  };

  /**
   * Allow Return => Tab to indent a list.
   * @type {Function}
   */
  handleTab: Function = (event: Event): void => {
    const { editorState } = this.state;
    const newEditorState = RichUtils.onTab(event, editorState, 2);
    if (newEditorState !== editorState) {
      this.handleChange(newEditorState);
    }
  };

  handleToolbarFocus: Function = (event): void => {
    const { onFocus } = this.props;
    if (onFocus && this.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  handleWrapperBlur: Function = (event: Object) => {
    const { onBlur } = this.props;
    if (onBlur && this.focusHandler.isEditorBlur(event)) {
      onBlur(event);
    }
  };

  handleChange: Function = (editorState: Object): void => {
    const { readOnly, onEditorStateChange } = this.props;
    if (
      !readOnly &&
      !(getSelectedBlocksType(editorState) === 'atomic' && editorState.getSelection().isCollapsed)
    ) {
      if (onEditorStateChange) {
        onEditorStateChange(editorState, this.props.wrapperId);
      }
      // eslint-disable-next-line
      if (!hasProperty(this.props, 'editorState')) {
        this.setState({ editorState }, this.afterChange(editorState));
      } else {
        this.afterChange(editorState);
      }
    }
  };

  afterChange: Function = (editorState): void => {
    setTimeout(() => {
      const { onChange, onContentStateChange } = this.props;
      if (onChange) {
        onChange(convertToRaw(editorState.getCurrentContent()));
      }
      if (onContentStateChange) {
        onContentStateChange(convertToRaw(editorState.getCurrentContent()));
      }
    });
  };

  setWrapperReference: Function = (ref: Object): void => {
    this.wrapper = ref;
  };

  setEditorRef: Function = (ref: Object): void => {
    this.editor = ref;
  };

  getCompositeDecorator = (): void => {
    const decorators = [
      ...this.props.customDecorators,
      getLinkDecorator({
        showOpenOptionOnHover: this.state.toolbar.link.showOpenOptionOnHover,
      }),
    ];

    if (this.props.hashtag) {
      decorators.push(getHashtagDecorator(this.props.hashtag));
    }
    return new CompositeDecorator(decorators);
  };

  getWrapperRef = () => this.wrapper;

  getEditorState = () => this.state.editorState;

  isReadOnly = () => this.props.readOnly;

  isImageAlignmentEnabled = () => this.state.toolbar.image.alignmentEnabled;

  /**
   * Initializes the editorState
   * @param  {[type]} compositeDecorator [description]
   * @return {[type]}                    [description]
   */
  createEditorState = compositeDecorator => {
    let editorState;
    if (hasProperty(this.props, 'editorState')) {
      if (this.props.editorState) {
        editorState = EditorState.set(this.props.editorState, {
          decorator: compositeDecorator,
        });
      }
    } else if (hasProperty(this.props, 'defaultEditorState')) {
      if (this.props.defaultEditorState) {
        editorState = EditorState.set(this.props.defaultEditorState, {
          decorator: compositeDecorator,
        });
      }
    } else if (hasProperty(this.props, 'contentState')) {
      if (this.props.contentState) {
        const contentState = convertFromRaw(this.props.contentState);
        editorState = EditorState.createWithContent(contentState, compositeDecorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    } else if (hasProperty(this.props, 'defaultContentState')) {
      let contentState = this.props.defaultContentState;
      if (contentState) {
        contentState = convertFromRaw(contentState);
        editorState = EditorState.createWithContent(contentState, compositeDecorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    }
    if (!editorState) {
      editorState = EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  };

  filterEditorProps = props => {
    return filter(props, EDITOR_PROPS);
  };

  changeEditorState = contentState => {
    const newContentState = convertFromRaw(contentState);
    let { editorState } = this.state;
    editorState = EditorState.push(editorState, newContentState, 'insert-characters');
    editorState = EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  focusEditor: Function = (): void => {
    setTimeout(() => {
      this.editor.focus();
    }, 100);
  };

  handleKeyCommand: Function = (command: Object): boolean => {
    const { editorState } = this.state;
    const isKnownCommand = (commands, comm) =>
      Object.keys(commands).find(key => commands[key] === comm);
    let newState;
    let ret = false;

    if (isKnownCommand(ENTITY_TYPE, command)) {
      ret = true;
      this.onRequestDialog(command);
    } else if (isKnownCommand(BLOCK_TYPE, command)) {
      ret = true;
      this.toggleBlockType(command);
    } else if (isKnownCommand(INLINE_STYLE, command)) {
      ret = true;
      this.toggleInlineStyle(command);
    } else {
      newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        ret = true;
        this.handleChange(newState);
      }
    }

    return ret;
  };
  /*
  The function documented in `draft-js` to be used to toggle inline styles of selection (mainly
  for some key combinations handled by default inside draft-js).
  */
  _toggleInlineStyle = inlineStyle => {
    this.handleChange(RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle));
  };

  handleReturn: Function = (event: Object): boolean => {
    if (SuggestionHandler.isOpen()) {
      return true;
    }
    const editorState = handleNewLine(this.state.editorState, event);
    if (editorState) {
      this.handleChange(editorState);
      return true;
    }
    return false;
  };

  preventDefault: Function = (event: Object) => {
    if (event.target.tagName === 'INPUT') {
      this.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };

  handleMouseDown: Function = (event: Object) => {
    if (event.target.tagName === 'INPUT') {
      this.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };

  render() {
    const { editorState, editorFocused, toolbar } = this.state;
    const {
      toolbarCustomButtons,
      toolbarOnFocus,
      toolbarClassName,
      toolbarHidden,
      editorClassName,
      wrapperClassName,
      toolbarStyle,
      editorStyle,
      wrapperStyle,
      uploadCallback,
      ariaLabel,
    } = this.props;

    const controlProps = {
      editorState,
      onChange: this.handleChange,
    };

    return (
      <div
        id={this.props.wrapperId}
        className={cN('boldredit-wrapper', wrapperClassName)}
        style={wrapperStyle}
        onBlur={this.handleWrapperBlur}
        aria-label="boldredit-wrapper"
      >
        {!toolbarHidden &&
          // $FlowIssue
          (editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus) &&
          <div
            className={cN('boldredit-toolbar', toolbarClassName)}
            style={toolbarStyle}
            onMouseDown={this.preventDefault}
            aria-label="boldredit-toolbar"
            aria-hidden={(!editorFocused && toolbarOnFocus).toString()}
            onFocus={this.handleToolbarFocus}
          >
            {toolbar.options.map((opt, index) => {
              const Control = Controls[opt];
              const config = toolbar[opt];
              if (opt === 'image' && uploadCallback) {
                config.uploadCallback = uploadCallback;
              }
              return <Control key={index} {...controlProps} config={config} />;
            })}
          </div>}
        <div
          ref={this.setWrapperReference}
          className={cN('boldredit-editor', editorClassName)}
          style={editorStyle}
          onFocus={this.handleEditorFocus}
          onBlur={this.onEditorBlur}
          onKeyDown={KeyDownHandler.onKeyDown}
          onMouseDown={this.onEditorMouseDown}
        >
          <Editor
            spellCheck={this.props.spellCheck}
            ref={this.setEditorRef}
            onTab={this.handleTab}
            editorState={editorState}
            onChange={this.handleChange}
            blockStyleFn={blockStyleFn}
            customStyleMap={getCustomStyleMap()}
            handleReturn={this.handleReturn}
            blockRendererFn={this.blockRendererFn}
            handleKeyCommand={this.handleKeyCommand}
            ariaLabel={ariaLabel || 'boldrui-editor'}
            placeholder={this.props.placeholder}
            {...(this: any).editorProps}
          />
        </div>
      </div>
    );
  }
}
