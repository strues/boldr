/* @flow weak*/
/* eslint-disable max-lines, flowtype/no-types-missing-file-annotation, react/no-array-index-key */
import React, { Component } from 'react';
import shortid from 'shortid';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js';
import {
  changeDepth,
  handleNewLine,
  getCustomStyleMap,
  extractInlineStyle,
  getSelectedBlocksType,
} from 'draftjs-utils';
import classNames from 'classnames';

import { ModalHandler, FocusHandler, KeyDownHandler, SuggestionHandler } from '../../eventHandlers';

import blockStyleFn from '../../utils/blockStyleFn';
import { hasProperty, filter, mergeRecursive } from '../../utils/common';

import * as Controls from '../../components/Controls';

import getLinkDecorator from '../Decorators/Link';
import getMentionDecorators from '../Decorators/Mention';
import getHashtagDecorator from '../Decorators/HashTag';

import getBlockRenderFunc from '../../Renderer';
import defaultToolbar from '../../config/defaultToolbar';
import { EDITOR_PROPS } from './constants';

export type Props = {
  onChange: ?Function,
  onEditorStateChange: ?Function,
  onContentStateChange: ?Function,
  defaultContentState: ?Object,
  contentState: ?Object,
  editorState: ?Object,
  defaultEditorState: ?Object,
  toolbarOnFocus?: boolean,
  spellCheck?: boolean,
  toolbar: ?Object,
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

export default class BoldrEditor extends Component {
  static defaultProps = {
    toolbarOnFocus: false,
    toolbarHidden: false,
    stripPastedStyles: false,
    wrapperId: shortid.generate(),
    customDecorators: [],
  };

  constructor(props) {
    super(props);
    const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    this.state = {
      // eslint-disable-next-line
      editorState: undefined,
      editorFocused: false,
      toolbar,
    };
    this.wrapperId = `boldrui-editor__wrapper${props.wrapperId}`;
    this.modalHandler = new ModalHandler();
    this.focusHandler = new FocusHandler();
    this.blockRendererFn = getBlockRenderFunc(
      {
        isReadOnly: this.isReadOnly,
        isImageAlignmentEnabled: this.isImageAlignmentEnabled,
        getEditorState: this.getEditorState,
        onChange: this.onChange,
      },
      props.customBlockRenderFunc,
    );
    this.editorProps = this.filterEditorProps(props);
    this.customStyleMap = getCustomStyleMap();
  }

  componentWillMount(): void {
    this.compositeDecorator = this.getCompositeDecorator();
    const editorState = this.createEditorState(this.compositeDecorator);
    extractInlineStyle(editorState);
    this.setState({
      editorState,
    });
  }

  componentDidMount(): void {
    this.modalHandler.init(this.wrapperId);
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
          decorator: this.compositeDecorator,
        });
      } else {
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
    this.editorProps = this.filterEditorProps(props);
    this.customStyleMap = getCustomStyleMap();
  }

  props: Props;

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

  onTab: Function = (event): boolean => {
    const { onTab } = this.props;
    if (!onTab || !onTab(event)) {
      const editorState = changeDepth(this.state.editorState, event.shiftKey ? -1 : 1, 4);
      if (editorState && editorState !== this.state.editorState) {
        this.onChange(editorState);
        event.preventDefault();
      }
    }
  };

  onUpDownArrow: Function = (event): boolean => {
    if (SuggestionHandler.isOpen()) {
      event.preventDefault();
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

  onChange: Function = (editorState: Object): void => {
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

  setEditorReference: Function = (ref: Object): void => {
    this.editor = ref;
  };

  getCompositeDecorator = (): void => {
    const decorators = [
      ...this.props.customDecorators,
      getLinkDecorator({
        showOpenOptionOnHover: this.state.toolbar.link.showOpenOptionOnHover,
      }),
    ];
    if (this.props.mention) {
      decorators.push(
        ...getMentionDecorators({
          ...this.props.mention,
          onChange: this.onChange,
          getEditorState: this.getEditorState,
          getSuggestions: this.getSuggestions,
          getWrapperRef: this.getWrapperRef,
          modalHandler: this.modalHandler,
        }),
      );
    }
    if (this.props.hashtag) {
      decorators.push(getHashtagDecorator(this.props.hashtag));
    }
    return new CompositeDecorator(decorators);
  };

  getWrapperRef = () => this.wrapper;

  getEditorState = () => this.state.editorState;

  getSuggestions = () => this.props.mention && this.props.mention.suggestions;

  isReadOnly = () => this.props.readOnly;

  isImageAlignmentEnabled = () => this.state.toolbar.image.alignmentEnabled;

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
    });
  };

  handleKeyCommand: Function = (command: Object): boolean => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  handleReturn: Function = (event: Object): boolean => {
    if (SuggestionHandler.isOpen()) {
      return true;
    }
    const editorState = handleNewLine(this.state.editorState, event);
    if (editorState) {
      this.onChange(editorState);
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
      modalHandler: this.modalHandler,
      editorState,
      onChange: this.onChange,
    };

    return (
      <div
        id={this.wrapperId}
        className={classNames('boldrui-editor-wrapper', wrapperClassName)}
        style={wrapperStyle}
        onClick={this.modalHandler.handleEditorClick}
        onBlur={this.handleWrapperBlur}
        aria-label="boldrui-editor-wrapper"
      >
        {!toolbarHidden &&
          (editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus) &&
          <div
            className={classNames('boldrui-editor-toolbar', toolbarClassName)}
            style={toolbarStyle}
            onMouseDown={this.preventDefault}
            aria-label="boldrui-editor-toolbar"
            aria-hidden={(!editorFocused && toolbarOnFocus).toString()}
            onFocus={this.handleToolbarFocus}
          >
            {toolbar.options.map(opt => {
              const Control = Controls[opt];
              const config = toolbar[opt];
              if (opt === 'image' && uploadCallback) {
                config.uploadCallback = uploadCallback;
              }
              return <Control key={shortid.generate()} {...controlProps} config={config} />;
            })}
            {toolbarCustomButtons &&
              toolbarCustomButtons.map(button =>
                React.cloneElement(button, { key: shortid.generate(), ...controlProps }),
              )}
          </div>}
        <div
          ref={this.setWrapperReference}
          className={classNames('boldrui-editor-main', editorClassName)}
          style={editorStyle}
          onClick={this.focusEditor}
          onFocus={this.handleEditorFocus}
          onBlur={this.onEditorBlur}
          onKeyDown={KeyDownHandler.onKeyDown}
          onMouseDown={this.onEditorMouseDown}
        >
          <Editor
            spellCheck={this.props.spellCheck}
            ref={this.setEditorReference}
            onTab={this.onTab}
            onUpArrow={this.onUpDownArrow}
            onDownArrow={this.onUpDownArrow}
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={blockStyleFn}
            customStyleMap={getCustomStyleMap()}
            handleReturn={this.handleReturn}
            blockRendererFn={this.blockRendererFn}
            handleKeyCommand={this.handleKeyCommand}
            ariaLabel={ariaLabel || 'boldrui-editor'}
            placeholder={this.props.placeholder}
            {...this.editorProps}
          />
        </div>
      </div>
    );
  }
}
