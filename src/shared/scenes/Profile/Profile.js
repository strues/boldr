/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import {
  Toolbar,
  Drawer,
  Button,
  Grid,
  Col,
  Row,
  StyleClasses,
} from 'boldr-ui';

// import config from '../../../../config';
import ProfileContent from './components/ProfileContent';
import OwnProfile from './components/OwnProfile';

type Props = {
  className?: string,
  profile: Object,
  email: string,
  drawer: boolean,
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
const BASE_ELEMENT = StyleClasses.PROFILE;
class Profile extends Component {
  constructor() {
    super();

    this.state = {
      me: false,
      files: [],
      profImg: false,
      showDropzone: false,
      avatar: false,
    };
    (this: any).setMe = this.setMe.bind(this);
    (this: any).onDrop = this.onDrop.bind(this);
    (this: any).onOpenClick = this.onOpenClick.bind(this);
  }

  state: State;

  componentDidMount() {
    this.setMe();
  }

  props: Props;
  onDrop(files: Array<Object>) {
    // $FlowIssue
    this.setState({
      file: files[0],
      showDropzone: false,
    });
    const payload = files[0];
    console.log(payload);
    const isProf = this.state.profImg === true;
    isProf
      ? this.props.uploadProfileImg(payload)
      : this.props.uploadAvatarImg(payload);
  }

  onOpenClick() {
    // $FlowIssue
    this.dropzone.open();
  }

  setMe() {
    const userEmail = this.props.email;
    const profEmail = this.props.profile.email;
    const isMe = userEmail === profEmail;
    this.setState({
      me: isMe,
    });
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
    const { profile } = this.props;
    const classes = classnames(BASE_ELEMENT);
    const UserProfileBg = styled.div`
      width: 100%;
      height: 375px;
      background-image: url(${profile.profileImage});
      background-size: cover;
    `;
    const close = (
      <Button icon onClick={this.props.handleDrawerClick}>close</Button>
    );

    const header = (
      <Toolbar
        nav={close}
        actions={null}
        className="md-divider-border md-divider-border--bottom"
      />
    );

    return (
      <div className={classes}>
        <UserProfileBg />
        <Grid>
          <div className="profile__content">
            <Row>
              <Col sm={12}>
                <ProfileContent
                  me={this.state.me}
                  handleProfileImgClick={this.handleProfileImgClick}
                  toggleDrawer={this.props.handleDrawerClick}
                  handleAvatarImgClick={this.handleAvatarImgClick}
                  profile={profile}
                />
              </Col>
            </Row>
            <Row>
              {this.state.showDropzone === true ? this.renderDropzone() : null}
            </Row>
            <Drawer
              clickableDesktopOverlay={false}
              position="right"
              navItems={null}
              visible={this.props.drawer}
              onVisibilityToggle={this.props.handleDrawerClick}
              type={Drawer.DrawerTypes.TEMPORARY}
              header={header}
              style={{ zIndex: 100 }}
            >
              <OwnProfile profile={profile} />
            </Drawer>
          </div>
        </Grid>

      </div>
    );
  }
}

export default Profile;
