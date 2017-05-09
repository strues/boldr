/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import Dropzone from 'react-dropzone';
// $FlowIssue
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import UploadFile from 'material-ui/svg-icons/file/file-upload';
import { Row, Col, Paper, Headline, Icon } from 'boldr-ui';
import { connect } from 'react-redux';
import { uploadMediaFile } from '../../../../../state/modules/media/actions';

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

const MediaTitleArea = styled.div`
  padding-top: 50px;
  margin-bottom: 35px;
`;

class UploadComputer extends Component {
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
      <Row xsCenter>
        <Col xs={6}>
          <Paper zDepth={1}>
            <MediaTitleArea>
              <Headline type="h1">
                <Icon
                  kind="folder-upload"
                  color="rgba(0, 188, 212, 1.00)"
                  size="36"
                />
                {' '}
                Upload from your computer
              </Headline>
            </MediaTitleArea>

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
              <IconButton
                onTouchTap={() => {
                  (this: any).dropzone.open();
                }}
              >
                <UploadFile />
              </IconButton>
            </div>
          </Paper>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({ media: state.media });
export default connect(mapStateToProps, { uploadMediaFile })(UploadComputer);
