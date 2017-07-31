/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import convertToRaw from 'draft-js/lib/convertFromDraftStateToRaw';
// $FlowIssue
import EditorState from 'draft-js/lib/EditorState';
import Editor from '../../../../../../components/BoldrEditor';

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
    const { input } = this.props;
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
