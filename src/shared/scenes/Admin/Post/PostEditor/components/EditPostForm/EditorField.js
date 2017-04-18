/* @flow */
import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {stateFromHTML} from 'draft-js-import-html';
// $FlowIssue
import convertFromRaw from 'draft-js/lib/convertFromRawToDraftState';
// $FlowIssue
import EditorState from 'draft-js/lib/EditorState';

type Props = {
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
      editorState = EditorState.createWithContent(
        stateFromHTML(props.input.value),
      );
    }
    this.state = {
      editorState,
    };
  }
  state: State;
  props: Props;
  onChange = editorState => {
    const {input} = this.props;
    input.onChange(convertToRaw(editorState.getCurrentContent()));
    this.setState({editorState});
  };
  render() {
    const {input, placeholder} = this.props;
    const {editorState} = this.state;
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
