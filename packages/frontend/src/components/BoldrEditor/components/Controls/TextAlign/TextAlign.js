/* @flow */

import * as React from 'react';
import type { EditorState } from 'draft-js';
import { getSelectedBlocksMetadata, setBlockData } from '../../../utils';

import TextAlignLayout from './TextAlignLayout';

type Props = {
  editorState: EditorState,
  modalHandler: Object,
  config: Object,
  onChange: Function,
};

type State = {
  expanded: boolean,
  currentTextAlignment: string,
};

export default class TextAlign extends React.Component<Props, State> {
  state = {
    currentTextAlignment: undefined,
  };
  state: State;
  componentWillReceiveProps(properties: Object) {
    if (properties.editorState !== this.props.editorState) {
      this.setState({
        currentTextAlignment: getSelectedBlocksMetadata(properties.editorState).get('text-align'),
      });
    }
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

  addBlockAlignmentData: Function = (value: string) => {
    const { editorState, onChange } = this.props;
    const { currentTextAlignment } = this.state;
    if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
  };

  render(): Object {
    const { expanded, currentTextAlignment } = this.state;
    return (
      <TextAlignLayout
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        currentState={{ textAlignment: currentTextAlignment }}
        onChange={this.addBlockAlignmentData}
      />
    );
  }
}
