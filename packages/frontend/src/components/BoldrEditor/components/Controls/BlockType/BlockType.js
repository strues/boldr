/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import { RichUtils } from 'draft-js';
// $FlowIssue
import type { EditorState } from 'draft-js';
import { getSelectedBlocksType } from '../../../utils';

import BlockTypeLayout from './BlockTypeLayout';

export type Props = {
  onChange: Function,
  editorState: EditorState,
  modalHandler: Object,
  config?: Object,
};

export type ToolbarBlockType = {
  label: 'Normal' | 'H1' | 'H2' | 'H3' | 'Blockquote' | 'Code',
  id: number,
  icon?: React.ElementType,
  style?: 'unstyled' | 'header-one' | 'header-two' | 'header-three' | 'blockquote' | 'code',
};

export type ToolbarBlockTypes = Array<ToolbarBlockType>;

type State = {
  expanded: boolean,
  currentBlockType: string,
};

class BlockType extends React.Component<Props, State> {
  state = {
    expanded: false,
    currentBlockType: 'unstyled',
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(editorState),
      });
    }
    modalHandler.registerCallback(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(properties.editorState),
      });
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallback(this.expandCollapse);
  }
  props: Props;
  blocksTypes: ToolbarBlockTypes = [
    { label: 'Normal', style: 'unstyled' },
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'Code', style: 'code' },
  ];

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

  toggleBlockType: Function = (blockType: string) => {
    const blockTypeValue = this.blocksTypes.find(bt => bt.label === blockType).style;
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleBlockType(editorState, blockTypeValue);
    if (newState) {
      onChange(newState);
    }
  };

  render(): React.Node {
    const { config } = this.props;
    const { currentBlockType, expanded } = this.state;

    const blockType = this.blocksTypes.find(bt => bt.style === currentBlockType);
    return (
      // $FlowIssue
      <BlockTypeLayout
        config={config}
        // $FlowIssue
        currentState={{ blockType: blockType && blockType.label }}
        onChange={this.toggleBlockType}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}

export default BlockType;
