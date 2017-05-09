/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import styled from 'styled-components';
import classnames from 'classnames';
import { Grid, Col, Row, StyleClasses } from 'boldr-ui';

// import config from '../../../../config';
import ProfileContent from './components/ProfileContent';

type Props = {
  className?: string,
  profile: Object,
  email: string,
};

type State = {
  me: boolean,
};
const BASE_ELEMENT = StyleClasses.PROFILE;
class Profile extends Component {
  constructor() {
    super();

    this.state = {
      me: false,
    };
    (this: any).setMe = this.setMe.bind(this);
  }

  state: State;

  componentDidMount() {
    this.setMe();
  }

  props: Props;

  setMe() {
    const userEmail = this.props.email;
    const profEmail = this.props.profile.email;
    const isMe = userEmail === profEmail;
    this.setState({
      me: isMe,
    });
  }

  // @TODO: API URL
  render() {
    const { profile } = this.props;
    const classes = classnames(BASE_ELEMENT);
    const UserProfileBg = styled.div`
      width: 100%;
      height: 375px;
      background-image: url(${profile.profileImage});
      background-size: cover;
    `;

    return (
      <div className={classes}>
        <UserProfileBg />
        <Grid>
          <div className="profile__content">
            <Row>
              <Col sm={12}>
                <ProfileContent me={this.state.me} profile={profile} />
              </Col>
            </Row>
          </div>
        </Grid>

      </div>
    );
  }
}

export default Profile;
