/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
// $FlowIssue
import type { EditorState } from 'draft-js';
import { toggleCustomInlineStyle, getSelectionCustomInlineStyle } from '../../../utils';
import type { ColorPickerConfig } from '../../../core/config';
import ColorPickerLayout from './ColorPickerLayout';

type Props = {
  onChange: Function,
  editorState: EditorState,
  config: ColorPickerConfig,
  modalHandler: Object,
};
type State = {
  expanded: boolean,
  currentColor?: string,
  currentBgColor?: string,
};
class ColorPicker extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      expanded: false,
      currentColor: undefined,
      currentBgColor: undefined,
    };
  }
  state: State;

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentColor: getSelectionCustomInlineStyle(editorState, ['COLOR']).COLOR,
        currentBgColor: getSelectionCustomInlineStyle(editorState, ['BGCOLOR']).BGCOLOR,
      });
    }
    modalHandler.registerCallback(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    const newState = {};
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      newState.currentColor = getSelectionCustomInlineStyle(properties.editorState, [
        'COLOR',
      ]).COLOR;
      newState.currentBgColor = getSelectionCustomInlineStyle(properties.editorState, [
        'BGCOLOR',
      ]).BGCOLOR;
    }
    this.setState(newState);
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

  toggleColor: Function = (style: string, color: string): void => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(editorState, style, color);
    if (newState) {
      onChange(newState);
    }
    this.doCollapse();
  };

  render(): React.Node {
    const { config } = this.props;
    const { currentColor, currentBgColor, expanded } = this.state;

    const color = currentColor && currentColor.substring(6);
    const bgColor = currentBgColor && currentBgColor.substring(8);
    return (
      <ColorPickerLayout
        config={config}
        onChange={this.toggleColor}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        currentState={{ color, bgColor }}
      />
    );
  }
}

export default ColorPicker;
