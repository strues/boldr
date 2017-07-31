/* @flow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
// internal
import { Col, Row, Grid } from '@boldr/ui/Layout';
import EditProfile from './components/EditProfile';

type Props = {
  currentUser: Object,
  uploadProfileImg: () => void,
  uploadAvatarImg: () => void,
  handleDrawerClick: () => void,
  uploadAvatarImage: Function,
  uploadProfileImage: Function,
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
      <div className="preferences-wrapper">
        <Helmet title="Account Preferences" />
        <Grid>
          <Row>
            <Col sm={12} md={4}>
              nav
            </Col>
            <Col sm={12} md={8}>
              <EditProfile profile={this.props.currentUser} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Preferences;
