/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import { toggleCustomInlineStyle, getSelectionCustomInlineStyle } from '../../../utils';

import FontFamilyLayout from './FontFamilyLayout';

export type Props = {
  onChange: Function,
  modalHandler: Object,
  editorState: Object,
  config?: Object,
};

type State = {
  expanded: boolean,
  currentFontFamily: string,
};

export default class FontFamily extends React.Component<Props, State> {
  state: State = {
    expanded: undefined,
    currentFontFamily: undefined,
  };
  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY,
      });
    }
    modalHandler.registerCallback(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(properties.editorState, ['FONTFAMILY'])
          .FONTFAMILY,
      });
    }
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

  toggleFontFamily: Function = (fontFamily: string) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(editorState, 'fontFamily', fontFamily);
    if (newState) {
      onChange(newState);
    }
  };

  render(): React.Node {
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
