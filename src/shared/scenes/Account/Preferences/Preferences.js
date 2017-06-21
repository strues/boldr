/* @flow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
// internal
import { Col, Row, Grid } from '@@components/Layout';
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
  }

  state: State;
  props: Props;

  uploadProfileImg = payload => {
    this.props.uploadProfileImage(payload);
  };
  uploadAvatarImg = payload => {
    this.props.uploadAvatarImage(payload);
  };
  //
  // onDrop(files: Array<Object>) {
  //   // $FlowIssue
  //   this.setState({
  //     file: files[0],
  //     showDropzone: false,
  //   });
  //   const payload = files[0];
  //
  //   const isProf = this.state.profImg === true;
  //   isProf ? this.props.uploadProfileImg(payload) : this.props.uploadAvatarImg(payload);
  // }
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

  render() {
    return (
      <div>
        <Helmet title="Account Preferences" />
        <Grid>
          <Row>
            <Col xs={12} md={4}>nav</Col>
            <Col xs={12} md={8}>
              <EditProfile profile={this.props.me} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Preferences;
