/* @flow */

import React, { Component } from 'react';
// $FlowIssue
import { AtomicBlockUtils } from 'draft-js';
import ImageLayout from './ImageLayout';

export type Props = {
  onChange: Function,
  editorState: Object,
  config: Object,
};
class Image extends Component {
  state: Object = {
    expanded: false,
  };

  props: Props;

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  handleExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  handleExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  handleCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  addImage: Function = (src: string, height: string, width: string, alt: string): void => {
    const { editorState, onChange, config } = this.props;
    const entityData = { src, height, width };
    if (config.alt.present) {
      entityData.alt = alt;
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', { src, height, width })
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    onChange(newEditorState);
    this.doCollapse();
  };

  render(): Object {
    const { config } = this.props;
    const { expanded } = this.state;
    const ImageComponent = ImageLayout;
    return (
      <ImageComponent
        config={config}
        onChange={this.addImage}
        expanded={expanded}
        onExpandEvent={this.handleExpandEvent}
        doExpand={this.handleExpand}
        doCollpase={this.handleCollapse}
      />
    );
  }
}

export default Image;
