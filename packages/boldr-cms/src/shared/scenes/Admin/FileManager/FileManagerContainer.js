/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import { showModal, hideModal } from '../../../state/modules/boldr/ui';
import { uploadFiles, fetchMedia, deleteMedia, selectFile } from '../../../state/modules/admin/attachments/actions';
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

  closeModal = () => {
    this.props.hideModal();
  }
  openModal = () => {
    this.props.showModal();
  }

  selectTheFile = (file) => {
    this.props.selectFile(file);
  }

  render() {
    return (
      <FileManager
        openModal={ this.openModal }
        closeModal={ this.closeModal }
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

export default connect(mapStateToProps, {
  uploadFiles, deleteMedia, fetchMedia, showModal, hideModal, selectFile,
})(FileManagerContainer);
