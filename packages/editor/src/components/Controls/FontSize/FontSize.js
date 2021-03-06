/* @flow */

import React from 'react';
import type { Node } from 'react';
import type { EditorState } from 'draft-js';
import { toggleCustomInlineStyle, getSelectionCustomInlineStyle } from '../../../utils';

import FontSizeLayout from './FontSizeLayout';

export type Props = {
  onChange: Function,
  editorState: EditorState,
  modalHandler: Object,
  config: Object,
};
type State = {
  expanded: boolean,
  currentFontSize: string,
};
export default class FontSize extends React.Component<Props, State> {
  state = {
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
    modalHandler.registerCallback(this.expandCollapse);
  }

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const styles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = styles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      this.setFontSize(defaultFontSize);
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
    modalHandler.deregisterCallback(this.expandCollapse);
  }
  props: Props;

  setFontSize = defaultFontSize => {
    this.setState({
      // eslint-disable-next-line
      defaultFontSize,
    });
  };

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

  render(): Node {
    const { config } = this.props;
    const { expanded, currentFontSize } = this.state;

    const fontSize = currentFontSize && Number(currentFontSize.substring(9));
    return (
      <FontSizeLayout
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
