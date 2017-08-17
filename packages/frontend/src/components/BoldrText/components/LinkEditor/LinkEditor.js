/* eslint-disable react/no-array-index-key, no-script-url, no-return-assign */
// @flow
import React, { Component } from 'react';
import { RichUtils, EditorState } from 'draft-js';
// $FlowIssue
import type { ContentState } from 'draft-js';
import { getSelectionEntity } from '../../utils/inline';
import Switch from '../Switch';
import Dropdown from '../Dropdown';

type Props = {
  editorState: EditorState,
  selection: any,
  language: Object,
  contentState: ContentState,
  onChange: Function,
};

type State = {
  href: string,
  target: string,
};

export default class LinkEditor extends Component<Props, State> {
  constructor() {
    super();
    // $FlowIssue
    this.dropDownComponent = null;
    this.state = {
      href: '',
      target: '',
    };
  }

  state: State;

  componentWillReceiveProps(next: Object) {
    const { contentState, editorState: nextEditorState } = next;

    if (nextEditorState && this.props.editorState !== nextEditorState) {
      const entityKey = getSelectionEntity(nextEditorState);
      if (entityKey) {
        const currentEntity = contentState.getEntity(entityKey);
        if (currentEntity && currentEntity.get('type') === 'LINK') {
          const { href, target } = currentEntity.getData();
          this.setState({ href, target });
        } else {
          this.setState({
            href: '',
            target: '',
          });
        }
      } else {
        this.setState({
          href: '',
          target: '',
        });
      }
    }
  }
  props: Props;
  inputLink = e => {
    this.setState({
      href: e.target.value,
    });
  };

  setTarget = () => {
    this.setState({
      target: this.state.target === '_blank' ? '' : '_blank',
    });
  };

  handleCancel = () => {
    this.dropDownComponent.hide();
  };

  handleUnlink = () => {
    const { editorState, selection, onChange } = this.props;

    this.dropDownComponent.hide();
    onChange(RichUtils.toggleLink(editorState, selection, null));
  };

  handleConfirm = () => {
    const { href, target } = this.state;
    const { editorState, contentState, onChange } = this.props;
    const currentContent = contentState.createEntity('LINK', 'MUTABLE', { href, target });
    const entityKey = currentContent.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent });

    this.dropDownComponent.hide();
    onChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
  };
  render() {
    const { href, target } = this.state;
    const { language } = this.props;
    const caption = <i className="icon-link" />;

    return (
      <div className="be-toolbar__item-group">
        <Dropdown
          caption={caption}
          hoverTitle={language.controls.link}
          hideOnBlur={false}
          showDropDownArrow={false}
          ref={instance => ((this: any).dropDownComponent = instance)}
          className={'be-toolbar__item dropdown be-link-editor__dropdown'}
        >
          <div className="be-link-editor">
            <div className="be-input-group">
              <input
                type="text"
                value={href}
                spellCheck={false}
                placeholder={language.linkEditor.inputPlaceHolder}
                onChange={this.inputLink}
              />
            </div>
            <div className="be-switch__group">
              <Switch active={target === '_blank'} onClick={this.setTarget} />
              <label>
                {language.linkEditor.openInNewWindow}
              </label>
            </div>
            <div className="be-buttons">
              <a
                onClick={this.handleUnlink}
                className="primary pull-left"
                href="javascript:void(0);"
              >
                <i className="icon-close" />
                <span>
                  {language.linkEditor.removeLink}
                </span>
              </a>
              <button onClick={this.handleConfirm} className="be-primary pull-right">
                {language.base.confirm}
              </button>
              <button onClick={this.handleCancel} className="be-default pull-right">
                {language.base.cancel}
              </button>
            </div>
          </div>
        </Dropdown>
        <button
          title={language.controls.unlink}
          className="be-toolbar__item be-button"
          onClick={this.handleUnlink}
        >
          <i className="icon-link-off" />
        </button>
      </div>
    );
  }
}
