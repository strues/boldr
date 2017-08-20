/* @flow */

import * as React from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { changeListDepth, getSelectedBlocksType } from '../../../utils';

import ListLayout from './ListLayout';

export type Props = {
  onChange: Function,
  editorState: EditorState,
  config: Object,
};

type State = {
  currentBlockType: string,
};

export default class List extends React.Component<Props, State> {
  state: State = {
    currentBlockType: 'unstyled',
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(editorState),
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(properties.editorState),
      });
    }
  }

  props: Props;

  onChange: Function = (value: string): void => {
    if (value === 'unordered') {
      this.toggleBlockType('unordered-list-item');
    } else if (value === 'ordered') {
      this.toggleBlockType('ordered-list-item');
    } else if (value === 'indent') {
      this.adjustDepth(1);
    } else {
      this.adjustDepth(-1);
    }
  };

  toggleBlockType: Function = (blockType: string): void => {
    const { onChange, editorState } = this.props;
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    if (newState) {
      onChange(newState);
    }
  };

  adjustDepth: Function = (adjustment): void => {
    const { onChange, editorState } = this.props;
    const newState = changeListDepth(editorState, adjustment, 4);
    if (newState) {
      onChange(newState);
    }
  };

  render(): React.Node {
    const { config } = this.props;
    const { currentBlockType } = this.state;
    const ListComponent = ListLayout;
    let listType;
    if (currentBlockType === 'unordered-list-item') {
      listType = 'unordered';
    } else if (currentBlockType === 'ordered-list-item') {
      listType = 'ordered';
    }
    return <ListComponent config={config} currentState={{ listType }} onChange={this.onChange} />;
  }
}
