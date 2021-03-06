/* @flow */

import React from 'react';
import type { Node } from 'react';
import { EditorState, Modifier } from 'draft-js';
import { getSelectionCustomInlineStyle, forEach } from '../../../utils';

import RemoveLayout from './RemoveLayout';

export type Props = {
  onChange: Function,
  editorState: Object,
  config: Object,
};

type State = {
  expanded: boolean,
};

export default class Remove extends React.Component<Props, State> {
  state: State = {
    expanded: false,
  };

  props: Props;

  removeAllInlineStyles: Function = (editorState: EditorState): void => {
    let contentState = editorState.getCurrentContent();
    [
      'BOLD',
      'ITALIC',
      'UNDERLINE',
      'STRIKETHROUGH',
      'MONOSPACE',
      'SUPERSCRIPT',
      'SUBSCRIPT',
    ].forEach(style => {
      contentState = Modifier.removeInlineStyle(contentState, editorState.getSelection(), style);
    });
    const customStyles = getSelectionCustomInlineStyle(editorState, [
      'FONTSIZE',
      'FONTFAMILY',
      'COLOR',
      'BGCOLOR',
    ]);
    forEach(customStyles, (key, value) => {
      if (value) {
        contentState = Modifier.removeInlineStyle(contentState, editorState.getSelection(), value);
      }
    });

    return EditorState.push(editorState, contentState, 'change-inline-style');
  };

  removeInlineStyles: Function = (): void => {
    const { editorState, onChange } = this.props;
    onChange(this.removeAllInlineStyles(editorState));
  };

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

  render(): Node {
    const { config } = this.props;
    const { expanded } = this.state;
    return (
      <RemoveLayout
        config={config}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.removeInlineStyles}
      />
    );
  }
}
