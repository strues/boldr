/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import { showModal, hideModal } from 'state/dux/ui';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { S3Uploader, Row, Col, Modal } from 'components/index';
import { uploadFiles, fetchMedia, deleteMedia } from './reducer';
import FileView from './components/FileView';

type Props = {
  handleFinish: () => void,
  attachments: Object,
  deleteMedia: () => void,
  uploadFiles: () => void,
  fetchMedia: () => void,
  hideModal: () => void,
  showModal: () => void,
  ui: Object,
};

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(fetchMedia()));
    return Promise.all(promises);
  },
}])
class FileManager extends Component {
  constructor(props) {
    super(props);
    (this: any).handleRemoveMedia = this.handleRemoveMedia.bind(this);
    (this: any).onUploadFinish = this.onUploadFinish.bind(this);
    (this: any).closeModal = this.closeModal.bind(this);
    (this: any).openModal = this.openModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchMedia();
  }
  props: Props;

  handleChange = (event, index, value) => this.setState({ value });

  onUploadFinish(signResult) {
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

  handleRemoveMedia(mediaId) {
    this.props.deleteMedia(mediaId);
  }
  closeModal() {
    this.props.hideModal();
  }
  openModal() {
    this.props.showModal();
  }
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <RaisedButton onClick={ this.openModal } label="Upload File" primary />
            <IconMenu iconButtonElement={
                <IconButton touch><NavigationExpandMoreIcon /></IconButton>
              }
            >
            <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
       <Row>
         <Col xs={ 12 }>
            <FileView files={ this.props.attachments.files } removeMedia={ this.handleRemoveMedia } />
         </Col>
       </Row>
       <Modal open={ this.props.ui.modal } onClose={ this.closeModal } title="Upload an image">
         <S3Uploader
           signingUrl="/s3/sign"
           server="/api/v1"
           accept="image/*"
           onProgress={ S3Uploader.onUploadProgress }
           onError={ S3Uploader.onUploadError }
           onFinish={ this.onUploadFinish }

           uploadRequestHeaders={ { 'x-amz-acl': 'public-read' } }
           contentDisposition="auto"
         />
       </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    attachments: state.attachments,
    ui: state.ui,
  };
};

export default connect(mapStateToProps, {
  uploadFiles, deleteMedia, fetchMedia, showModal, hideModal,
})(FileManager);
