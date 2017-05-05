/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import { Editor } from 'react-draft-wysiwyg';
// $FlowIssue
import convertToRaw from 'draft-js/lib/convertFromDraftStateToRaw';
// $FlowIssue
import EditorState from 'draft-js/lib/EditorState';

const editorStyle = {
  minHeight: 200,
  height: '100%',
};

type Props = {
  input: Object,
  placeholder: string,
};
export default class FieldEditor extends Component {
  state = { editorState: EditorState.createEmpty() };
  onChange = (editorState: Object) => {
    const { input } = this.props;
    input.onChange(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  };

  props: Props;

  render() {
    const { input, placeholder } = this.props;
    const { editorState } = this.state;
    return (
      <Editor
        {...input}
        editorStyle={editorStyle}
        onEditorStateChange={this.onChange}
        editorState={editorState}
        placeholder={placeholder}
      />
    );
  }
}
