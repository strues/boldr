/* eslint-disable react/prefer-stateless-function, react/no-array-index-key */
// @flow
import React, { Component } from 'react';
import cN from 'classnames';
// $FlowIssue
import type { EditorState } from 'draft-js';
import { getSelectedBlocksMetadata, setBlockData } from '../../utils/block';

type Props = {
  editorState: EditorState,
  onChange: Function,
  language: Object,
};
type State = {
  currentAlignment: string,
};
export default class TextAlign extends Component<Props, State> {
  state = {
    currentAlignment: undefined,
  };

  componentWillReceiveProps(next: Object) {
    if (this.props.editorState !== next.editorState) {
      this.setState({
        currentAlignment: getSelectedBlocksMetadata(next.editorState).get('textAlign'),
      });
    }
  }
  props: Props;
  setAlignment = e => {
    const { alignment } = e.target.dataset;
    const { editorState, onChange } = this.props;
    const { currentAlignment } = this.state;

    if (alignment !== currentAlignment) {
      onChange(
        setBlockData(editorState, {
          textAlign: alignment,
        }),
      );
    } else {
      onChange(
        setBlockData(editorState, {
          textAlign: undefined,
        }),
      );
    }
  };

  render() {
    const { currentAlignment } = this.state;
    const { language } = this.props;
    const textAlignmentTitles = [
      language.controls.alignLeft,
      language.controls.alignCenter,
      language.controls.alignRight,
      language.controls.alignJustify,
    ];

    return (
      <div className="be-toolbar__item-group">
        {['left', 'center', 'right', 'justify'].map((item, index) => {
          return (
            <button
              key={index}
              title={textAlignmentTitles[index]}
              data-alignment={item}
              className={cN('be-toolbar__item', 'be-button', { active: item === currentAlignment })}
              onClick={this.setAlignment}
            >
              <i className={cN(`icon-align-${item}`)} />
            </button>
          );
        })}
      </div>
    );
  }
}
