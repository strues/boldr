/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// internal
import { Row, Col } from '@@components/Layout';
import Paper from '@@components/Paper';
import Image from '@@components/Image';
import { updateAttachment } from '../../state';
import FileEditorForm from '../components/FileEditorForm';

type Props = {
  currentFile: Object,
  updateAttachment: Function,
};
export class FileEditor extends Component {
  constructor() {
    super();
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }
  props: Props;

  handleSubmit(values: Object) {
    const attachmentData = {
      id: this.props.currentFile.id,
      fileName: values.fileName,
      fileDescription: values.fileDescription,
    };
    this.props.updateAttachment(attachmentData);
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={12} md={5}>
            <Image src={this.props.currentFile.url} alt="current file" width={600} height={240} />
          </Col>
          <Col xs={12} md={7}>
            <Paper
              zDepth={2}
              style={{
                padding: '1em',
                background: '#fff',
              }}
            >
              <FileEditorForm onSubmit={this.handleSubmit} />
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentFile: state.admin.attachments.currentFile,
  };
};

export default connect(mapStateToProps, { updateAttachment })(FileEditor);
