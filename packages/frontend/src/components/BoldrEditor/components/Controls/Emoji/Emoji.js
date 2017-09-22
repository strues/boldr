/* @flow */

import React, { Component } from 'react';
import { Modifier, EditorState } from 'draft-js';

import EmojiLayout from './EmojiLayout';

export type Props = {
  onChange: Function,
  modalHandler: Object,
  editorState: EditorState,
  config?: Object,
};
type State = {
  expanded: boolean,
};

export default class Emoji extends Component<Props, State> {
  state: State = {
    expanded: false,
  };

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallback(this.expandCollapse);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallback(this.expandCollapse);
  }
  props: Props;

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  addEmoji: Function = (emoji: string): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      emoji,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    this.doCollapse();
  };

  render(): Object {
    const { config } = this.props;
    const { expanded } = this.state;

    return (
      <EmojiLayout
        config={config}
        onChange={this.addEmoji}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}
