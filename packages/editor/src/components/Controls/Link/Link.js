/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import { getSelectionText, getEntityRange, getSelectionEntity } from '../../../utils';

import LinkLayout from './LinkLayout';

export type Props = {
  onChange: Function,
  editorState: EditorState,
  config: Object,
  modalHandler: Object,
};

type State = {
  expanded: boolean,
  link: any,
  selectionText: string,
  currentEntity: Object,
};

class Link extends React.Component<Props, State> {
  state = {
    expanded: false,
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentEntity: getSelectionEntity(editorState),
      });
    }
    modalHandler.registerCallback(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    const newState = {};
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      newState.currentEntity = getSelectionEntity(properties.editorState);
    }
    this.setState(newState);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallback(this.expandCollapse);
  }

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  onChange = (action, title, target, targetOption) => {
    if (action === 'link') {
      this.addLink(title, target, targetOption);
    } else {
      this.removeLink();
    }
  };

  getCurrentValues = () => {
    const { editorState } = this.props;
    const { currentEntity } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentValues = {};
    if (currentEntity && contentState.getEntity(currentEntity).get('type') === 'LINK') {
      currentValues.link = {};
      const entityRange = currentEntity && getEntityRange(editorState, currentEntity);
      currentValues.link.target =
        currentEntity && contentState.getEntity(currentEntity).get('data').url;
      currentValues.link.targetOption =
        currentEntity && contentState.getEntity(currentEntity).get('data').target;
      currentValues.link.title = entityRange && entityRange.text;
    }
    currentValues.selectionText = getSelectionText(editorState);
    return currentValues;
  };

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  removeLink: Function = (): void => {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();
    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
      onChange(RichUtils.toggleLink(editorState, selection, undefined));
    }
  };

  addLink: Function = (linkTitle, linkTarget, linkTargetOption): void => {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', { url: linkTarget, target: linkTargetOption })
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    // insert a blank space after link
    selection = newEditorState.getSelection().merge({
      anchorOffset: selection.get('anchorOffset') + linkTitle.length,
      focusOffset: selection.get('anchorOffset') + linkTitle.length,
    });
    newEditorState = EditorState.acceptSelection(newEditorState, selection);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selection,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined,
    );
    onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
    this.doCollapse();
  };
  props: Props;
  render(): React.Node {
    const { config } = this.props;
    const { expanded } = this.state;
    const { link, selectionText } = this.getCurrentValues();
    return (
      <LinkLayout
        config={config}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        currentState={{
          link,
          selectionText,
        }}
        onChange={this.onChange}
      />
    );
  }
}

export default Link;
