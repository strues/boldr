/* @flow */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { uploadMediaFile } from '../../../../state/modules/media/actions';

type Props = {
  uploadMediaFile: () => void,
  dispatch: () => void,
};

type State = {
  files: Array<Object>,
  file: Object,
};

class UploadMedia extends Component {
  state = {
    files: [],
    file: {},
  };
  state: State;
  props: Props;
  onDrop = files => {
    this.setState({
      file: files[0],
    });
    const payload = files[0];
    this.props.uploadMediaFile(payload);
  };

  onOpenClick() {
    (this: any).dropzone.open();
  }
  render() {
    return (
      <Dropzone
        className="boldr-dropzone boldr-dropzone__panel"
        ref={node => {
          (this: any).dropzone = node;
        }}
        multiple={false}
        onDrop={this.onDrop}
        accept="image/*"
        maxSize={5242880}
      >
        <p className="boldr-dropzone__drop">
          Drop an image here or select one from your computer. <br />
          It will upload right away.
        </p>
      </Dropzone>
    );
  }
}

const mapStateToProps = state => ({ media: state.media });
export default connect(mapStateToProps, { uploadMediaFile })(UploadMedia);
