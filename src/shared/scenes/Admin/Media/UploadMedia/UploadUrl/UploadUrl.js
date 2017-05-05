/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadMediaUrl } from '../../../../../state/modules/media/actions';
import UploadUrlForm from './UploadUrlForm';

type Props = {
  uploadMediaUrl: () => void,
};
class UploadUrl extends Component {
  handleSubmit = values => {
    const payload = values;

    this.props.uploadMediaUrl(payload);
  };
  props: Props;
  render() {
    return <UploadUrlForm onSubmit={this.handleSubmit} />;
  }
}

export default connect(null, { uploadMediaUrl })(UploadUrl);
