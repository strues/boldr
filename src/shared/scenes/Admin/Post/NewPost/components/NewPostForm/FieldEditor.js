import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import convertToRaw from 'draft-js/lib/convertFromDraftStateToRaw';
import EditorState from 'draft-js/lib/EditorState';

const editorStyle = {
  minHeight: 200,
  height: '100%',
};

type Props = {
  input: object,
  placeholder: string,
};
export default class FieldEditor extends Component {
  state = { editorState: EditorState.createEmpty() };
  onChange = editorState => {
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
        editorStyle={editorStyle}
        {...input}
        onEditorStateChange={this.onChange}
        editorState={editorState}
        placeholder={placeholder}
      />
    );
  }
}
