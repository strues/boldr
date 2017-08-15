/* @flow */

import React, { Component } from 'react';
import { toggleCustomInlineStyle, getSelectionCustomInlineStyle } from '../../../utils';

import FontFamilyLayout from './FontFamilyLayout';

export type Props = {
  onChange: Function,
  editorState: Object,
  config?: Object,
};

export default class FontFamily extends Component {
  state: Object = {
    expanded: undefined,
    currentFontFamily: undefined,
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY,
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(properties.editorState, ['FONTFAMILY'])
          .FONTFAMILY,
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

  toggleFontFamily: Function = (fontFamily: string) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(editorState, 'fontFamily', fontFamily);
    if (newState) {
      onChange(newState);
    }
  };

  render(): Object {
    const { config } = this.props;
    const { expanded, currentFontFamily } = this.state;

    const fontFamily = currentFontFamily && currentFontFamily.substring(11);
    return (
      <FontFamilyLayout
        config={config}
        currentState={{ fontFamily }}
        onChange={this.toggleFontFamily}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}
