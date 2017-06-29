/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import { convertFromHTML } from 'draft-convert';
// $FlowIssue
import { convertToRaw, EditorState } from 'draft-js';
import Editor from '../../../../../../components/BoldrEditor';

export type Props = {
  input: Object,
  placeholder: string,
};
const editorStyle = {
  minHeight: 400,
};
type State = {
  editorState: EditorState,
};
export default class EditorField extends Component {
  constructor(props: Props) {
    super(props);
    let editorState = EditorState.createEmpty();
    if (props.input.value) {
      editorState = EditorState.createWithContent(convertFromHTML(props.input.value));
    }
    this.state = {
      editorState,
    };
  }
  state: State;
  props: Props;
  onChange = (editorState: Object) => {
    const { input } = this.props;
    input.onChange(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  };
  render() {
    const { input, placeholder } = this.props;
    const { editorState } = this.state;
    return (
      <Editor
        {...input}
        editorStyle={editorStyle}
        onEditorStateChange={this.onChange}
        editorState={editorState}
        toolbarClassName="playground-toolbar"
        wrapperClassName="playground-wrapper"
        editorClassName="playground-editor"
        toolbar={{
          history: { inDropdown: true },
          inline: { inDropdown: false },
          list: { inDropdown: true },
          link: { showOpenOptionOnHover: true },
          textAlign: { inDropdown: true },
        }}
      />
    );
  }
}
