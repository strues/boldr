/* eslint-disable react/no-unused-state */
/* @flow */
import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import hasWindow from '@boldr/utils/lib/dom/hasWindow';
import UPLOAD_MEDIA_MUTATION from '../../../../Media/gql/uploadMedia.graphql';
import Editor from '../../../../../../components/BoldrEditor';

type Props = {
  input: Object,
  placeholder: string,
  mutate: Function,
};

type State = {
  raw: Object,
  htmlContent: string,
};
class FieldEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { raw: undefined, htmlContent: undefined };
  }

  handleHTMLChange = htmlContent => {
    this.setState({ htmlContent });
    if (hasWindow) {
      window.localStorage.setItem('htmlContent', htmlContent);
    }
  };

  handleRawChange = raw => {
    this.setState({ raw });
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
    return (
      <Editor
        {...input}
        toolbarClassName="boldredit-toolbar"
        wrapperClassName="boldredit-wrapper"
        editorClassName="boldrui-editor"
        contentFormat="raw"
        onRawChange={this.handleRawChange}
        onHtmlChange={this.handleHTMLChange}
        toolbar={{
          image: {
            uploadCallback: this.handleUpload,
            fileUrl: 'http://localhost:2121/uploads/media',
          },
          link: { showOpenOptionOnHover: true },
        }}
      />
    );
  }
}
// $FlowIssue
export default graphql(UPLOAD_MEDIA_MUTATION)(FieldEditor);
