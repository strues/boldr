/* @flow */
import React, { Component } from 'react';
import hasWindow from '@boldr/utils/lib/dom/hasWindow';
import Editor from '../../../../../../components/BoldrEditor';

export type Props = {
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
  state: State = { editorState: undefined, htmlContent: undefined };

  props: Props;

  handleHTMLChange = htmlContent => {
    console.log(htmlContent);
    this.setState({ htmlContent });
    if (hasWindow) {
      window.localStorage.setItem('htmlContent', htmlContent);
    }
  };

  handleRawChange = raw => {
    this.setState({ editorState: raw });
    console.log(raw);
  };
  render() {
    const { input, placeholder } = this.props;
    const { editorState } = this.state;
    return (
      <Editor
        {...input}
        editorStyle={editorStyle}
        contentFormat="raw"
        onRawChange={this.handleRawChange}
        onHtmlChange={this.handleHTMLChange}
        initialContent={input.value}
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
