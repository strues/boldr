/* eslint-disable max-lines, react/no-array-index-key */
/* @flow */
import * as React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  genKey,
  SelectionState,
  ContentBlock,
  CompositeDecorator,
} from 'draft-js';
import type { DraftDecoratorType } from 'draft-js';
import { OrderedSet, List } from 'immutable';
import styled from 'styled-components';
import classNames from 'classnames';

import {
  ModalHandler,
  FocusHandler,
  KeyDownHandler,
  SuggestionHandler,
} from './core/eventHandlers';
import {
  handleNewLine,
  getCustomStyleMap,
  extractInlineStyle,
  getSelectedBlocksType,
  changeListDepth,
  blockRenderMap,
  blockStyleFn,
  hasProperty,
  filter,
  mergeRecursive,
} from './utils';
import moveSelectionToEnd from './utils/moveSelectionToEnd';
import type { CustomStyleMap } from './utils/inline';
import * as Controls from './components/Controls';

import { getLinkDecorator, getMentionDecorators, getHashtagDecorator } from './core/decorators';
import getBlockRenderFunc from './core/blockRender';
import configDefaults from './core/config';
import type { ToolbarConfig } from './core/config';
import type { BoldrEditorType } from './BoldrEditorType';

const EditorToolbar = styled.div`
  display: inline-flex;
  flex-shrink: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  padding: 6px 5px 0;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  margin-bottom: 5px;
  font-size: 15px;
  user-select: none;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
`;

export type State = {
  editorState: EditorState,
  // is the editor focused
  editorFocused: boolean,
  // the toolbar config object
  toolbar: ToolbarConfig,
};

export default class BoldrEditor extends React.Component<BoldrEditorType, State> {
  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    toolbarOnFocus: false,
    toolbarHidden: false,
    stripPastedStyles: false,
    customDecorators: [],
  };

  constructor(props: BoldrEditorType) {
    super(props);
    const toolbar = mergeRecursive(configDefaults, props.toolbar);
    this.state = {
      editorState: undefined,
      editorFocused: false,
      toolbar,
    };
    const wrapperId = props.wrapperId ? props.wrapperId : Math.floor(Math.random() * 10000);
    this.wrapperId = `boldr-editor__wrapper-${wrapperId}`;
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

  state: State;

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

  componentWillReceiveProps(props: BoldrEditorType) {
    const newState = {};
    // if toolbar changes, merge changes into the default settings
    if (this.props.toolbar !== props.toolbar) {
      const toolbar = mergeRecursive(configDefaults, props.toolbar);
      newState.toolbar = toolbar;
    }
    // if editorState is passed, we arent empty. load the provided state
    if (hasProperty(props, 'editorState') && this.props.editorState !== props.editorState) {
      if (props.editorState) {
        newState.editorState = EditorState.set(props.editorState, {
          decorator: this.compositeDecorator,
        });
      } else {
        // create the empty state
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

  wrapperId: string;
  modalHandler: ModalHandler;
  focusHandler: FocusHandler;
  blockRendererFn: Function;
  customStyleMap: CustomStyleMap;
  compositeDecorator: DraftDecoratorType;
  editorProps: Object;
  props: BoldrEditorType;

  /**
   * On change method.
   * @function onChange
   * @param {EditorState} editorState New editor state.
   * @returns {undefined}
   */
  onChange: Function = (editorState: EditorState): void => {
    const { readOnly, onEditorStateChange } = this.props;
    if (
      !readOnly &&
      !(getSelectedBlocksType(editorState) === 'atomic' && editorState.getSelection().isCollapsed)
    ) {
      if (onEditorStateChange) {
        onEditorStateChange(editorState);
      }
      if (!hasProperty(this.props, 'editorState')) {
        this.setState({ editorState }, this.afterChange(editorState));
      } else {
        this.afterChange(editorState);
      }
    }
  };
  /**
   * runs after the onChange method, converting editorState to
   * raw Immutable Map.
   * @function onChange
   * @param {EditorState} editorState New editor state.
   * @returns {undefined}
   */
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

  getWrapperRef = () => this.refs.wrapper;

  getEditorState = () => this.state.editorState;

  getSuggestions = () => this.props.mention && this.props.mention.suggestions;

  isReadOnly = () => this.props.readOnly;

  isImageAlignmentEnabled = () => this.state.toolbar.image.alignmentEnabled;

  createEditorState = compositeDecorator => {
    let editorState;

    if (this.props.editorState) {
      editorState = EditorState.set(this.props.editorState, {
        decorator: compositeDecorator,
      });
    }

    if (!editorState) {
      editorState = EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  };

  filterEditorProps = props => {
    return filter(props, [
      'onChange',
      'onEditorStateChange',
      'onContentStateChange',
      'initialContentState',
      'defaultContentState',
      'contentState',
      'editorState',
      'defaultEditorState',
      'toolbarOnFocus',
      'toolbar',
      'toolbarCustomButtons',
      'toolbarClassName',
      'editorClassName',
      'toolbarHidden',
      'wrapperClassName',
      'toolbarStyle',
      'editorStyle',
      'wrapperStyle',
      'uploadCallback',
      'onFocus',
      'onBlur',
      'onTab',
      'mention',
      'hashtag',
      'ariaLabel',
      'customBlockRenderFunc',
      'customDecorators',
    ]);
  };

  changeEditorState = contentState => {
    const newContentState = convertFromRaw(contentState);
    let { editorState } = this.state;
    editorState = EditorState.push(editorState, newContentState, 'insert-characters');
    editorState = moveSelectionToEnd(editorState);
    return editorState;
  };

  focusEditor: Function = (): void => {
    setTimeout(() => {
      this.editor.focus();
    });
  };

  onEditorBlur: Function = (): void => {
    this.setState({
      editorFocused: false,
    });
  };

  onEditorFocus: Function = (event: SyntheticEvent<>): void => {
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

  onTab: Function = (event: SyntheticEvent<>): void => {
    const { onTab } = this.props;
    if (!onTab || !onTab(event)) {
      const editorState = changeListDepth(this.state.editorState, event.shiftKey ? -1 : 1, 4);
      if (editorState && editorState !== this.state.editorState) {
        this.onChange(editorState);
        event.preventDefault();
      }
    }
  };

  onUpDownArrow: Function = (event: SyntheticEvent<>): boolean => {
    if (SuggestionHandler.isOpen()) {
      event.preventDefault();
    }
  };

  onToolbarFocus: Function = (event: SyntheticEvent<>): void => {
    const { onFocus } = this.props;
    if (onFocus && this.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  onWrapperBlur: Function = (event: SyntheticEvent<>) => {
    const { onBlur } = this.props;
    if (onBlur && this.focusHandler.isEditorBlur(event)) {
      onBlur(event);
    }
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

  handleReturn: Function = (event: SyntheticEvent<>): boolean => {
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

  preventDefault: Function = (event: SyntheticEvent<>) => {
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
      toolbarHidden,
      editorClassName,
      wrapperClassName,
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

    const toolbarIsVisible =
      !toolbarHidden && (editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus);

    return (
      <div
        id={this.wrapperId}
        className={classNames('be-wrapper', wrapperClassName)}
        style={wrapperStyle}
        onClick={this.modalHandler.onEditorClick}
        onBlur={this.onWrapperBlur}
        aria-label="be-wrapper"
      >
        <EditorToolbar
          isVisible={toolbarIsVisible}
          // $FlowIssue
          aria-hidden={(!editorFocused && toolbarOnFocus).toString()}
          onFocus={this.onToolbarFocus}
          onMouseDown={this.preventDefault}
          aria-label="be-toolbar"
        >
          {toolbar.options.map((opt, index) => {
            const Control = Controls[opt];
            const config = toolbar[opt];
            if (opt === 'image' && uploadCallback) {
              // $FlowIssue
              config.uploadCallback = uploadCallback;
            }
            return <Control key={index} {...controlProps} config={config} />;
          })}
          {toolbarCustomButtons &&
            toolbarCustomButtons.map((button, index) =>
              React.cloneElement(button, { key: index, ...controlProps }),
            )}
        </EditorToolbar>
        <div
          ref={el => {
            this.wrapper = el;
          }}
          className={classNames('be-main', editorClassName)}
          style={editorStyle}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
          onKeyDown={KeyDownHandler.onKeyDown}
          onMouseDown={this.onEditorMouseDown}
        >
          <Editor
            ref={el => {
              this.editor = el;
            }}
            onTab={this.onTab}
            spellcheck={this.props.spellcheck}
            onUpArrow={this.onUpDownArrow}
            onDownArrow={this.onUpDownArrow}
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={blockStyleFn}
            customStyleMap={getCustomStyleMap()}
            handleReturn={this.handleReturn}
            blockRendererFn={this.blockRendererFn}
            handleKeyCommand={this.handleKeyCommand}
            blockRenderMap={blockRenderMap}
            ariaLabel={ariaLabel || 'boldr-editor'}
            {...this.editorProps}
          />
        </div>
      </div>
    );
  }
}