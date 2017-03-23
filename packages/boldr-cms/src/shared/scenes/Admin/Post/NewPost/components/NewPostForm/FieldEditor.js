import React, { PropTypes, PureComponent } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';


const editorStyle = {
  minHeight: 200,
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
        editorStyle={ editorStyle }
        { ...input }
        onEditorStateChange={ this.onChange }
        editorState={ editorState }
        placeholder={ placeholder }
      />
    );
    // </div>;
  }
}

FieldEditor.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
};
