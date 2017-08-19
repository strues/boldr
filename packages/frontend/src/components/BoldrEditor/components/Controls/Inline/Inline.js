/* @flow */

import * as React from 'react';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import { getSelectionInlineStyle, forEach } from '../../../utils';
import InlineLayout from './InlineLayout';

export type Props = {
  onChange: Function,
  editorState: EditorState,
};
type State = {
  currentStyles: Object,
};

export default class Inline extends React.Component<Props, State> {
  state: State = {
    currentStyles: {},
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(editorState)),
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState && this.props.editorState !== properties.editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(properties.editorState)),
      });
    }
  }

  props: Props;
  // eslint-disable-next-line
  changeKeys = style => {
    if (style) {
      const st = {};
      forEach(style, (key, value) => {
        st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
      });
      return st;
    }
  };

  toggleInlineStyle: Function = (style: string): void => {
    const newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(editorState, newStyle);

    if (style === 'subscript' || style === 'superscript') {
      const removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
      const contentState = Modifier.removeInlineStyle(
        newState.getCurrentContent(),
        newState.getSelection(),
        removeStyle,
      );
      newState = EditorState.push(newState, contentState, 'change-inline-style');
    }
    if (newState) {
      onChange(newState);
    }
  };

  render(): Object {
    const { currentStyles } = this.state;
    return <InlineLayout currentState={currentStyles} onChange={this.toggleInlineStyle} />;
  }
}
