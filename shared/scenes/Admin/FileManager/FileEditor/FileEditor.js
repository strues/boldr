/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'react-md/lib/Papers';
import { Grid, Row, Col, Image } from '../../../../components/index';
import FileEditorForm from '../components/FileEditorForm';

type Props = {
  currentFile: Object,
  updateAttachment: Function,
};
export class FileEditor extends Component {
  props: Props;
  render() {
    return (
      <div>
        <Row>
          <Col xs={ 12 } md={ 5 }>
            <Image imgSrc={ this.props.currentFile.url } width="400px" />
          </Col>
          <Col xs={ 12 } md={ 7 }>
            <Paper zDepth={ 2 }>
              <FileEditorForm />
            </Paper>
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

export default connect(mapStateToProps)(FileEditor);
