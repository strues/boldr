/* @flow */

import React, { Component } from 'react';
// $FlowIssue
import { RichUtils } from 'draft-js';
import { getSelectedBlocksType } from '../../../utils';
import BlockTypeLayout from './BlockTypeLayout';

export type Props = {
  onChange: Function,
  editorState?: Object,
  config?: Object,
};

class BlockType extends Component {
  state: Object = {
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

  blockTypes: Array<Object> = [
    { label: 'Normal', style: 'unstyled' },
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'Blockquote', style: 'blockquote' },
  ];

  toggleBlockType: Function = (blockType: string) => {
    const blockTypeValue = this.blockTypes.find(bt => bt.label === blockType).style;
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleBlockType(editorState, blockTypeValue);
    if (newState) {
      onChange(newState);
    }
  };

  render(): Object {
    const { config } = this.props;
    const { currentBlockType } = this.state;
    const BlockTypeComponent = BlockTypeLayout;
    const blockType = this.blockTypes.find(bt => bt.style === currentBlockType);
    return (
      <BlockTypeComponent
        config={config}
        currentState={{ blockType: blockType && blockType.label }}
        onChange={this.toggleBlockType}
      />
    );
  }
}

export default BlockType;
