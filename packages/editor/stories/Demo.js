import React from 'react';
import BoldrEditor from '../src/index';

class DemoEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { raw: undefined, htmlContent: undefined };
  }

  handleHTMLChange = htmlContent => {
    this.setState({ htmlContent });
    if (typeof window !== 'undefined') {
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

  render() {
    const { input } = this.props;
    return (
      <BoldrEditor
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

export default DemoEditor;
