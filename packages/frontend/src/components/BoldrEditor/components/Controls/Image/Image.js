/* @flow */

import * as React from 'react';
// $FlowIssue
import { AtomicBlockUtils } from 'draft-js';

import ImageLayout from './ImageLayout';

export type Props = {
  onChange: Function,
  editorState: Object,
  config: Object,
  modalHandler: Object,
};
type State = {
  expanded: boolean,
};

class ImageControl extends React.Component<Props, State> {
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

  addImage: Function = (src: string, height: string, width: string): void => {
    const { editorState, onChange } = this.props;
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
    return (
      <ImageLayout
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

export default ImageControl;
