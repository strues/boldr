import React, { PropTypes, Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import convertToRaw from 'draft-js/lib/convertFromDraftStateToRaw';
import EditorState from 'draft-js/lib/EditorState';

const editorStyle = {
  minHeight: 200,
};
export default class FieldEditor extends Component {
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
