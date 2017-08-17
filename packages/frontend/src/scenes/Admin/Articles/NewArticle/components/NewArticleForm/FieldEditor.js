/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import convertToRaw from 'draft-js/lib/convertFromDraftStateToRaw';
// $FlowIssue
import EditorState from 'draft-js/lib/EditorState';
// import Editor from '../../../../../../components/BoldrEditor';
import BoldrText from '../../../../../../components/BoldrText';

const editorStyle = {
  minHeight: 200,
  height: '100%',
};

type Props = {
  input: Object,
  placeholder: string,
};
export default class FieldEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { htmlContent: '' };
  }
  handleHTMLChange = htmlContent => {
    console.log(htmlContent);
    this.setState({ htmlContent });
  };

  handleRawChange = raw => {
    console.log(raw);
  };
  props: Props;

  render() {
    const { input } = this.props;
    const { editorState } = this.state;
    return (
      <BoldrText
        {...input}
        height={600}
        ref={instance => (this.editor = instance)}
        initialContent={this.state.htmlContent}
        language="en"
        media={{
          video: true,
          audio: true,
        }}
        onRawChange={this.handleRawChange}
        onHtmlChange={this.handleHTMLChange}
      />
    );
  }
}
