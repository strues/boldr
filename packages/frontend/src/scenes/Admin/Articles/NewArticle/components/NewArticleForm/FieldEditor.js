/* @flow */
import React, { Component } from 'react';
import convertToRaw from 'draft-js/lib/convertFromDraftStateToRaw';
import { graphql } from 'react-apollo';
import EditorState from 'draft-js/lib/EditorState';

import UPLOAD_MEDIA_MUTATION from '../../../../Media/gql/uploadMedia.graphql';
import Editor from '../../../../../../components/BoldrEditor';

const editorStyle = {
  minHeight: 200,
  height: '100%',
};

type Props = {
  input: Object,
  placeholder: string,
  mutate: Function,
};

class FieldEditor extends Component {
  state = { editorState: EditorState.createEmpty() };
  onChange = (editorState: Object) => {
    const { input } = this.props;
    input.onChange(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  };
  handleUpload = file => {
    return new Promise((resolve, reject) => {
      this.props
        .mutate({
          variables: {
            file,
          },
        })
        .then(data => {
          return resolve(data);
        })
        .catch(err => reject(err));
    });
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
        contentFormat="html"
        importContent="<p>Hey</p>"
        toolbarClassName="boldredit-toolbar"
        wrapperClassName="boldredit-wrapper"
        editorClassName="boldrui-editor"
        toolbar={{
          image: { uploadCallback: this.handleUpload },
          history: { inDropdown: true },
          inline: { inDropdown: false },
          list: { inDropdown: true },
          link: { showOpenOptionOnHover: true },
          textAlign: { inDropdown: false },
        }}
      />
    );
  }
}

export default graphql(UPLOAD_MEDIA_MUTATION)(FieldEditor);
