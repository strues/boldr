/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import { uploadFiles, fetchMedia, deleteMedia, selectFile } from './actions';
import FileManager from './FileManager';

type Props = {
  handleFinish: () => void,
  attachments: Object,
  selectFile: () => void,
  deleteMedia: () => void,
  uploadFiles: () => void,
  fetchMedia: () => void,
  hideModal: () => void,
  showModal: () => void,
  ui: Object,
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchMedia());
  },
})
class FileManagerContainer extends Component {
  componentDidMount() {
    this.props.fetchMedia();
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
    this.props.uploadFiles(payload);
  }

  handleRemoveMedia = (mediaId) => {
    this.props.deleteMedia(mediaId);
  }

  selectTheFile = (file) => {
    this.props.selectFile(file);
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
    attachments: state.attachments,
    ui: state.boldr.ui,
  };
};

export default connect(mapStateToProps, {
  uploadFiles, deleteMedia, fetchMedia, selectFile,
})(FileManagerContainer);
