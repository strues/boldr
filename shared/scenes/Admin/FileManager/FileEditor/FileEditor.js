/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'react-md/lib/Papers';
import { updateAttachment } from '../../../../state/modules/admin/attachments/actions';
import { Grid, Row, Col, Image, FormCard } from '../../../../components/index';
import FileEditorForm from '../components/FileEditorForm';

type Props = {
  currentFile: Object
}
export class FileEditor extends Component {
  constructor() {
    super();

    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }
  props: Props;

  handleSubmit(values: Object) {
    const attachmentData = {
      file_name: values.file_name,
      file_description: values.file_description,
      id: this.props.currentFile.id,
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
          <FormCard title="Edit File Properties" form={ <FileEditorForm onSubmit={ this.handleSubmit } /> } />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentFile: state.admin.attachments.currentFile,
  };
};

export default connect(mapStateToProps, { updateAttachment })(FileEditor);
