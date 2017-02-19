/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'react-md/lib/Papers';
import { Grid, Row, Col, Image } from '../../../../components/index';
import { updateAttachment } from '../../../../state/modules/attachments/actions';
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
      file_name: values.file_name,
      file_description: values.file_description,
    };
    this.props.updateAttachment(attachmentData);
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={ 12 } md={ 5 }>
            <Image imgSrc={ this.props.currentFile.url } width="400px" />
          </Col>
          <Col xs={ 12 } md={ 7 }>
            <Paper zDepth={ 2 } style={ { padding: '1em', background: '#fff' } }>
              <FileEditorForm onSubmit={ this.handleSubmit } />
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentFile: state.attachments.currentFile,
  };
};

export default connect(mapStateToProps, { updateAttachment })(FileEditor);
