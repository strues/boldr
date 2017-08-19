/* @flow */

import * as React from 'react';
import type { EditorState } from 'draft-js';
import { getSelectedBlocksMetadata, setBlockData } from '../../../utils';

import TextAlignLayout from './TextAlignLayout';

type Props = {
  editorState: EditorState,
  onChange: Function,
};

type State = {
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

  addBlockAlignmentData: Function = (value: string) => {
    const { editorState, onChange } = this.props;
    const { currentTextAlignment } = this.state;
    if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
  };

  render(): React.Node {
    const { currentTextAlignment } = this.state;
    return (
      <TextAlignLayout
        currentState={{ textAlignment: currentTextAlignment }}
        onChange={this.addBlockAlignmentData}
      />
    );
  }
}
