/* @flow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone';
import { Col, Row, Grid } from '~components/Layout';
import { BaseTemplate } from '../../../templates';
import EditProfile from './components/EditProfile';

type Props = {
  uploadProfileImg: () => void,
  uploadAvatarImg: () => void,
  handleDrawerClick: () => void,
};
type State = {
  me: boolean,
  showDropzone: boolean,
  profImg: boolean,
  files: Array<Object>,
};
class Preferences extends Component {
  constructor() {
    super();

    this.state = {
      me: false,
      files: [],
      profImg: false,
      showDropzone: false,
      avatar: false,
    };

    (this: any).onDrop = this.onDrop.bind(this);
  }

  state: State;
  props: Props;

  uploadProfileImg = payload => {
    this.props.uploadProfileImage(payload);
  };
  uploadAvatarImg = payload => {
    this.props.uploadAvatarImage(payload);
  };

  onDrop(files: Array<Object>) {
    // $FlowIssue
    this.setState({
      file: files[0],
      showDropzone: false,
    });
    const payload = files[0];

    const isProf = this.state.profImg === true;
    isProf
      ? this.props.uploadProfileImg(payload)
      : this.props.uploadAvatarImg(payload);
  }
  handleAvatarImgClick = () => {
    this.setState({
      profImg: false,
      avatar: true,
      showDropzone: true,
    });
  };
  handleProfileImgClick = () => {
    this.setState({
      profImg: true,
      avatar: false,
      showDropzone: true,
    });
  };
  renderDropzone = () => {
    return (
      <Dropzone
        className="boldr-dropzone"
        ref={node => {
          this.dropzone = node;
        }}
        multiple={false}
        onDrop={this.onDrop}
        accept="image/*"
        maxSize={5242880}
      >
        <p className="boldr-dropzone__drop-sm">
          Drop an image here or select one from your computer. <br />
          It will upload right away.
        </p>
      </Dropzone>
    );
  };
  render() {
    return (
      <BaseTemplate helmetMeta={<Helmet title="Account Preferences" />}>
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              {this.props.me
                ? <EditProfile profile={this.props.me} />
                : <h1>Loading</h1>}
            </Col>
            <Col xs={12} md={4}>
              {this.renderDropzone()}
            </Col>
          </Row>
        </Grid>
      </BaseTemplate>
    );
  }
}

export default Preferences;
