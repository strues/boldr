
import React, { Component, PropTypes } from 'react';
import S3Upload from '../../core/services/s3Upload';
import FileUpload from '../FileInput/FileUpload';

export type Props = {
  signingUrl?: string,
  preprocess?: Function,
  getSignedUrl?: Function,
  onProgress?: Function,
  onFinish?: Function,
  onError?: Function,
  signingUrlHeaders?: Object,
  signingUrlQueryParams?: Object,
  uploadRequestHeaders?: Object,
  contentDisposition?: string,
  server?: string,
};

class S3Uploader extends Component {
  constructor(props: Props) {
    super(props);

    this.uploadFile = this.uploadFile.bind(this);
    this.preprocess = this.preprocess.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onError = this.onError.bind(this);
  }
  props: Props;
  onProgress(percent, message) {
    console.log(`Upload progress: ${percent} % ${message}`);
  }
  onFinish(signResult) {
    this.props.onFinish(signResult);

    this.setState({
      file: signResult.publicUrl,
    });
  }

  onError(message) {
    console.log(`Upload error: ${message}`);
  }

  preprocess(file, next) {
    console.log(`Pre-process: ${file.name}`);
    next(file);
  }
  _setFile = (file) => {
    this.setState({ file });
  };
  uploadFile(event) {
    new S3Upload({ // eslint-disable-line
      fileElement: event,
      signingUrl: this.props.signingUrl || '/s3/sign',
      getSignedUrl: this.props.getSignedUrl,
      preprocess: this.preprocess,
      onProgress: this.onProgress,
      onFinishS3Put: this.props.onFinish,
      onError: this.props.onError,
      signingUrlHeaders: this.props.signingUrlHeaders,
      signingUrlQueryParams: this.props.signingUrlQueryParams,
      uploadRequestHeaders: this.props.uploadRequestHeaders,
      contentDisposition: this.props.contentDisposition,
      server: this.props.server,
    });
  }
  // http://stackoverflow.com/a/24608023/194065
  clearInputFile(f) {
    try {
      f.value = '';
    } catch (err) {
      console.log(err);
    }
  }
  clear(event) {
    this.clearInputFile(event.target);
  }

  render() {
    return (
      <FileUpload
        label="Select a file"
        onChange={ this.uploadFile }
        accept="image/*"
      />
    );
  }
}

export default S3Uploader;
