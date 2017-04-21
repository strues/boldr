/* @flow */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Helmet from 'react-helmet';
import { Paper, Button } from 'boldr-ui';
import { connect } from 'react-redux';
import { uploadMediaFile } from '../../../../state/modules/media/actions';

type Props = {
  uploadMediaFile: () => void,
  dispatch: () => void,
  dropzone: () => void,
};

type State = {
  files: Array<Object>,
  file: Object,
  percentComplete: number,
  uploadIsComplete: boolean,
};

class UploadMedia extends Component {
  state = {
    files: [],
    file: {},
    percentComplete: 100,
    uploadIsComplete: false,
  };
  state: State;
  props: Props;
  uploadSuccess = () => {
    this.setState({
      uploadIsComplete: true,
      percentComplete: 100,
    });
    // this.props.onUpload();
  };
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
      <Paper zDepth={1}>
        <Dropzone
          className="boldrui-dropzone boldrui-dropzone__panel"
          ref={node => {
            (this: any).dropzone = node;
          }}
          multiple={false}
          onDrop={this.onDrop}
          accept="image/*"
          maxSize={5242880}
        >
          <p className="boldrui-dropzone__drop">
            Drop an image here or select one from your computer. <br />
            It will upload right away.
          </p>
        </Dropzone>
        <div className="boldrui-dropzone__footer">
          <Button
            primary
            icon
            onClick={() => {
              this.dropzone.open();
            }}
          >
            file_upload
          </Button>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({ media: state.media });
export default connect(mapStateToProps, { uploadMediaFile })(UploadMedia);
