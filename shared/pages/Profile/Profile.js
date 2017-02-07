/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'react-md/lib/Papers';
import { Grid, Col, Row, Heading } from '../../components';

type Props = {
  profile: Object,
  email: String,
};

type State = {
  me: boolean,
}

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
  render() {
    const { profile } = this.props;

    const UserProfileBg = styled.div`
      width: 100%;
      height: 375px;
      background-image: url(${profile.profileImage});
      background-size: cover;
    `;
    return (
      <div className="boldr-profile">
        <UserProfileBg />
        <Grid>
          <Paper zDepth={ 2 } style={ { marginTop: '-100px', padding: '1em' } }>
            <Row>
              <Col sm={ 12 }>
                <Heading size={ 1 }>{ profile.firstName } { ' ' } { profile.lastName }'s Profile</Heading>
                <br />
                <br />
                { profile.email }<br />
              </Col>
            </Row>
          </Paper>
        </Grid>

      </div>
    );
  }
}

export default Profile;
