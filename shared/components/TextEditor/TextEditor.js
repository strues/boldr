/* @flow weak */
import React, { Component } from 'react';
import { Map } from 'immutable';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import {
  AtomicBlockUtils,
  convertFromRaw,
  Editor,
  EditorState,
  Entity,
  RichUtils,
} from 'draft-js';
import {
  CustomBlockControls,
  InlineStyleControls,
  BlockStyleControls,
  BLOCK_CONTROLS,
  INLINE_CONTROLS,
} from './controls';
import decorator from './decorators/defaultDecorator';
import EditorValue from './lib/EditorValue';

type ChangeHandler = (value: EditorValue) => any;
type Props = {
  focus?: () => void,
  onChange: ChangeHandler,
  onBlur: ?Function,
  removeLink: Function,
  _handleKeyCommand: () => void,
  onFocus: Function,
  closeLinkPrompt: Function,
  content: Object,
  controlDisplay?: 'block' | 'inline',
  blockControls?: boolean | Array<string>,
  inlineControls?: boolean | Array<string>,
  customBlockControls?: boolean | Array<string>,
  readOnly?: boolean,
  linkTarget?: '_blank' | '_parent' | '_self' | '_top',
  placeholder?: string,
  customBlocks?: Object,
  spellCheck?: boolean,
  stripPastedStyles?: boolean,
  value: EditorValue
};

type State = {
  editorState: EditorState,
  showUrlInput: boolean,
  urlValue: string,
  showCustomBlockInput: boolean,
  customBlockData: Object,
  customBlockType: any
};

// Glorified wrapper for Draft-js
class TextEditor extends Component {
  constructor(props: Props) {
    super(props);

    let editorState = EditorState.createEmpty(decorator);

    if (props.value) {
      editorState = EditorState.createWithContent(stateFromHTML(props.value), decorator);
    }

    this.state = {
      editorState,
      showUrlInput: false,
      urlValue: '',
      showCustomBlockInput: false,
      customBlockType: null,
      customBlockData: {},
    };

    (this: any).onChange = this.onChange.bind(this);
    (this: any).handleKeyCommand = command => this._handleKeyCommand(command);
    (this: any).toggleBlockType = type => this._toggleBlockType(type);
    (this: any).toggleInlineStyle = style => this._toggleInlineStyle(style);
    (this: any).toggleCustomBlockInput = nextState => this._toggleCustomBlockInput(nextState);

    (this: any).closeLinkPrompt = this._closeLinkPrompt.bind(this);
    (this: any).confirmLink = this._confirmLink.bind(this);
    (this: any).onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);

    (this: any).onUrlChange = e => this.setState({ urlValue: e.target.value });
    (this: any).promptForLink = this.promptForLink.bind(this);
    (this: any).removeLink = this._removeLink.bind(this);

    (this: any).confirmBlock = this._confirmBlock.bind(this);
    (this: any).onBlockInputKeyDown = this._onBlockInputKeyDown.bind(this);
    (this: any).onBlockDataChange = this._onBlockDataChange.bind(this);
    (this: any).renderBlock = this.renderBlock.bind(this);
  }

  state: State;
  componentWillReceiveProps(nextProps: Object) {
    const contentState = this.state.editorState.getCurrentContent();

    if (nextProps.content && !this.props.content && !contentState.hasText()) {
      const editorState = EditorState.createWithContent(convertFromRaw(nextProps.content));
      this.setState({ editorState });
    }
  }

  props: Props;
  onFocus: Function = (e: Object): void => {
    this.refs.editor.focus();
    this.props.onFocus(e);
  }

  onChange: Function = (editorState): void => {
    this.setState({ editorState }, () => {
      // const contentState = editorState.getCurrentContent();
      const html = stateToHTML(editorState.getCurrentContent());
      this.props.onChange(html);
    });
  }

  _handleKeyCommand: Function = (command: string) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      (this: any).onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType: Function = (blockType: any): void => {
    (this: any).onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    );
  }

  _toggleInlineStyle: Function = (inlineStyle): void => {
    if (inlineStyle === 'LINK') {
      if (!(this: any).state.showUrlInput) {
        this.promptForLink();
      } else {
        (this: any).removeLink();
      }
    } else {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle,
        ),
      );
    }
  }

  _confirmBlock: Function = (e: Object, data: Object) => {
    this.setState({
      customBlockData: {},
      customBlockType: null,
      editorState: this._insertCustomBlock(
          this.state.editorState,
          this.state.customBlockType,
          data || this.state.customBlockData,
        ),
      showCustomBlockInput: false,
    });
  }

  _onBlockInputKeyDown: Function = (e: Object): void => {
    if (e.which === 13) {
      (this: any)._confirmBlock();
    }
  }

  _onBlockDataChange: Function = (customBlockData: any): void => {
    this.setState({ customBlockData });
  }

  _insertCustomBlock(editorState, type, data) {
    const entityKey = Entity.create(type, 'IMMUTABLE', data);

      // if you use an empty string for the block content here Draft will die
    return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  }

  _toggleCustomBlockInput(nextState) {
    if (this.state.showCustomBlockInput && nextState.customBlockType === this.state.customBlockType) {
      this.setState({
        showCustomBlockInput: false,
        customBlockType: null,
        customBlockData: {},
      });
    } else {
      this.setState(nextState, () => {
        if (this.refs.customBlockInput) {
          this.refs.customBlockInput.focus();
        }
      });
    }
  }
  /**
   * @private
   * @name _closeLinkPrompt
   * closes the link alert
   */
  _closeLinkPrompt() {
    this.setState({
      showUrlInput: false,
      urlValue: '',
    });
  }
  /**
   * @private
   * @name _confirmLink
   */
  _confirmLink: Function = (): void => {
    const { editorState, urlValue } = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', { target: this.props.linkTarget, url: urlValue });

    this.onChange(
      RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey,
      ),
    );

    (this: any).closeLinkPrompt();
  }

  _focus: Function = (): void => {
    this.refs.editor.focus();
  }
  /**
   * @private
   * @name _onLinkInputKeyDown
   * @param {Object} e  the event
   */
  _onLinkInputKeyDown: Function = (e): void => {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  /**
   * @private
   * @name _promptForLink
   */
  promptForLink: Function = (): void => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    if (! selection.isCollapsed()) {
      if (RichUtils.currentBlockContainsLink(editorState)) {
        (this: any).removeLink();
      } else {
        this.setState({
          showUrlInput: true,
          urlValue: '',
        }, () => {
          setTimeout(() => this.refs.url.focus(), 0);
        });
      }
    }
  }

  /**
   * @private
   * @name _removeLink
   */
  _removeLink: Function = (): void => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    (this: any).onChange(RichUtils.toggleLink(editorState, selection, null));
  }

  renderBlock: Function = (block) => {
    if (block.getType() === 'atomic') {
      const entityType = Entity.get(block.getEntityAt(0)).getType();
      return this.props.customBlocks[entityType] ? this.props.customBlocks[entityType].getBlockRenderer() : null;
    }

      // fall back to default renderer
    return null;
  }
  /**
   * @method renderControls
   */
  renderControls: Function = () => {
    const controls = [];

    if (this.props.blockControls) {
      controls.push(
        <BlockStyleControls
          editorState={ this.state.editorState }
          controls={ this.props.blockControls }
          display={ this.props.controlDisplay }
          key="block-controls"
          onToggle={ (this: any).toggleBlockType }
        />,
      );
    }
    if (this.props.inlineControls) {
      controls.push(
        <InlineStyleControls
          editorState={ this.state.editorState }
          onToggle={ (this: any).toggleInlineStyle }
          controls={ this.props.inlineControls }
          display={ this.props.controlDisplay }
          key="inline-controls"
        />,
      );
    }

    if (this.props.customBlockControls) {
      controls.push(
        <CustomBlockControls
          customBlocks={ this.props.customBlocks }
          controls={ this.props.customBlockControls }
          customBlockType={ this.state.customBlockType }
          display={ this.props.controlDisplay }
          key="custom-block-controls"
          onClick={ (this: any).toggleCustomBlockInput }
        />,
      );
    }

    if (this.props.controlDisplay === 'inline') {
      return controls.reverse();
    }

    return controls;
  }


  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'be';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' boldr-editor__hide-placeholder';
      }
    }

    let urlInput,
      blockInput;
    if (this.state.showUrlInput) {
      urlInput = (
        <div className="boldr-editor__url-input">
          <input
            className="boldr-editor__url-input__text"
            onChange={ (this: any).onUrlChange }
            ref="url"
            type="text"
            value={ this.state.urlValue }
            onKeyDown={ (this: any).onLinkInputKeyDown }
          />
          <button className="boldr-editor__url-input__button" onMouseDown={ (this: any).confirmLink }>
            Confirm
          </button>
        </div>
      );
    }

    if (this.state.showCustomBlockInput) { // $FlowIssue
      blockInput = this.props.customBlocks[this.state.customBlockType].renderInputForm.apply(
        this,
        [
          this.state.customBlockData,
          (this: any).onBlockDataChange,
          (this: any).onBlockInputKeyDown,
          (this: any).confirmBlock,
        ],
      );
    }
    return (
      <div className="boldr-editor__root" id="editor-root">
        <div className="boldr-editor__toolbar">
          {
            !this.props.readOnly ? this.renderControls() : null
          }
          {
            !this.props.readOnly ? urlInput : null
          }
          {
            !this.props.readOnly ? blockInput : null
          }
        </div>
        <div className={ className } id="editor">
          <Editor ref="editor"
            { ...this.props }
            editorState={ editorState }
            blockRendererFn={ this.renderBlock }
            placeholder={ this.props.placeholder }
            onChange={ this.onChange }
            handleKeyCommand={ (this: any).handleKeyCommand }
            spellCheck={ this.props.spellCheck }
            stripPastedStyles={ this.props.stripPastedStyles }
            readOnly={ this.props.readOnly }
          />
        </div>
      </div>
    );
  }
}
// $FlowIssue
TextEditor.defaultProps = {
  blockControls: BLOCK_CONTROLS,
  controlDisplay: 'block',
  inlineControls: INLINE_CONTROLS,
  customBlockControls: [],
  customBlocks: {},
  linkTarget: '_blank',
  placeholder: '',
  readOnly: false,
  spellCheck: true,
  stripPastedStyles: false,
};


export default TextEditor;
