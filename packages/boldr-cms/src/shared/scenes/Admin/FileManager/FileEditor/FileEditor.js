import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col, Image } from '../../../../components/index';
import FileEditorForm from '../components/FileEditorForm';

export class FileEditor extends Component {

  render() {
    return (
      <div>
          <Row>
            <Col xs={ 12 } md={ 5 }>
            <Image imgSrc={ this.props.currentFile.url } width="500px" />
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
