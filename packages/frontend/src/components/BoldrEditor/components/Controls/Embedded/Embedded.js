/* @flow */

import React, { Component } from 'react';
import { AtomicBlockUtils } from 'draft-js';

import EmbeddedLayout from './EmbeddedLayout';

export type Props = {
  onChange: Function,
  editorState: Object,
  modalHandler?: Object,
  config?: Object,
};

class Embedded extends Component {
  state: Object = {
    expanded: false,
  };

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }
  props: Props;
  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
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

  addEmbeddedLink: Function = (embeddedLink, height, width): void => {
    const { editorState, onChange, config: { embeddedLinkParser } } = this.props;

    // Parsing the embedded Link
    let parsedEmbeddedLink;
    if (embeddedLinkParser) {
      parsedEmbeddedLink = embeddedLinkParser(embeddedLink);
    } else {
      parsedEmbeddedLink = embeddedLink;
    }

    const entityKey = editorState
      .getCurrentContent()
      .createEntity('EMBEDDED_LINK', 'MUTABLE', {
        src: parsedEmbeddedLink,
        height,
        width,
      })
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    onChange(newEditorState);
    this.doCollapse();
  };

  render(): Object {
    const { config } = this.props;
    const { expanded } = this.state;
    const EmbeddedComponent = config.component || EmbeddedLayout;
    return (
      <EmbeddedComponent
        config={config}
        onChange={this.addEmbeddedLink}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}

export default Embedded;
