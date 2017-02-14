/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { uploadFiles, fetchMedia, deleteMedia, selectFile } from '../../../state/modules/admin/attachments/actions';
import FileManager from './FileManager';

type Props = {
  handleFinish: () => void,
  attachments: Object,
  dispatch: Function,
  selectFile: () => void,
  deleteMedia: () => void,
  uploadFiles: () => void,
  fetchMedia: () => void,
  hideModal: () => void,
  showModal: () => void,
  ui: Object,
};

class FileManagerContainer extends Component {
  static fetchData(dispatch) {
    return Promise.all([
      dispatch(fetchMedia()),
    ]);
  }
  componentDidMount() {
    const { dispatch } = this.props;

   // Fetching data for client side rendering
    FileManagerContainer.fetchData(dispatch);
  }
  props: Props;

  onUploadFinish = (signResult) => {
    const signUrl = signResult.signedUrl;
    const splitUrl = signUrl.split('?');
    const fileUrl = splitUrl[0];

    const payload = {
      file_name: signResult.file_name,
      original_name: signResult.original_name,
      file_type: signResult.file_type,
      s3_key: signResult.s3_key,
      url: fileUrl,
    };
    this.props.dispatch(uploadFiles(payload));
  }

  handleRemoveMedia = (mediaId) => {
    this.props.dispatch(deleteMedia(mediaId));
  }

  selectTheFile = (file) => {
    this.props.dispatch(selectFile(file));
  }

  render() {
    return (
      <FileManager
        onUploadFinish={ this.onUploadFinish }
        handleRemoveMedia={ this.handleRemoveMedia }
        attachments={ this.props.attachments }
        selectFile={ this.selectTheFile }
        ui={ this.props.ui }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    attachments: state.admin.attachments,
    ui: state.boldr.ui,
  };
};

export default connect(mapStateToProps)(FileManagerContainer);
