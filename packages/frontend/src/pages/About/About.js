/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import Headline from '@boldr/ui/Headline';
import canUseDom from '@boldr/utils/lib/dom/inDOM';
import BoldrText from '../../components/BoldrText';

class About extends React.Component {
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
  preview() {
    if (typeof window !== 'undefined' && typeof window === 'object') {
      if (window.previewWindow) {
        window.previewWindow.close();
      }
      window.previewWindow = window.open();
      window.previewWindow.document.write(this.buildPreviewHtml());
    }
  }
  buildPreviewHtml() {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>PREVIEW</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
            <div class="container">${this.state.htmlContent}</div>
        </body>
      </html>
    `;
  }

  render() {
    return (
      <div>
        <Helmet title="About" />
        <Headline type="h1">About</Headline>
        <div className="demo">
          <BoldrText
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
            addonControls={[
              {
                type: 'split',
              },
              {
                type: 'button',
                text: 'Preview',
                className: 'preview-button',
                onClick: this.preview.bind(this),
              },
            ]}
          />
        </div>
      </div>
    );
  }
}
export default About;
