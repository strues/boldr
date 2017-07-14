/* @flow */

import React, { Component } from 'react';
import { fontSizes, toggleCustomInlineStyle, getSelectionCustomInlineStyle } from 'draftjs-utils';

import FontSizeLayout from './FontSizeLayout';

export type Props = {
  onChange: Function,
  editorState: Object,
  modalHandler?: Object,
  config?: Object,
};

export default class FontSize extends Component {
  state: Object = {
    expanded: undefined,
    currentFontSize: undefined,
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentFontSize: getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const styles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = styles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      this.setState({
        defaultFontSize,
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      this.setState({
        currentFontSize: getSelectionCustomInlineStyle(properties.editorState, ['FONTSIZE'])
          .FONTSIZE,
      });
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
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

  toggleFontSize: Function = (fontSize: number) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(editorState, 'fontSize', fontSize);
    if (newState) {
      onChange(newState);
    }
  };

  render(): Object {
    const { config } = this.props;
    const { undoDisabled, redoDisabled, expanded, currentFontSize } = this.state;
    const FontSizeComponent = config.component || FontSizeLayout;
    const fontSize = currentFontSize && Number(currentFontSize.substring(9));
    return (
      <FontSizeComponent
        config={config}
        currentState={{ fontSize }}
        onChange={this.toggleFontSize}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}
