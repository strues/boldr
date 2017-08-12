/* @flow */

import React, { Component } from 'react';
// $FlowIssue
import { AtomicBlockUtils } from 'draft-js';
import ImageLayout from './ImageLayout';

export type Props = {
  onChange: Function,
  editorState: Object,
  modalHandler: Object,
  config: Object,
};
class Image extends Component {
  state: Object = {
    expanded: false,
  };

  componentWillMount(): void {
    this.props.modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount(): void {
    this.props.modalHandler.deregisterCallBack(this.expandCollapse);
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
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollpase={this.doCollpase}
      />
    );
  }
}

export default Image;
