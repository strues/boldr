import React, { PureComponent } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

const wrapperStyle = {
  border: 'solid #ddd 1px',
  marginBottom: 20,
  borderRadius: 5,
  padding: 15,
};
const editorStyle = {
  minHeight: 400,
};
export default class FieldEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  onChange = editorState => {
    const { input } = this.props;
    input.onChange(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  };
  render() {
    const { input, placeholder } = this.props;
    const { editorState } = this.state;
    return (
      <Editor
        wrapperStyle={ wrapperStyle }
        editorStyle={ editorStyle }
        // toolbarOnFocus
        {  ...input }
        onEditorStateChange={ this.onChange }
        editorState={ editorState }
        placeholder={ placeholder }
      />
    );
    // </div>;
  }
}
