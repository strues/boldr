/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'react-md/lib/Papers';
import Drawer from 'react-md/lib/Drawers';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import { Grid, Col, Row, Heading } from '../../components';

import OwnProfile from './components/OwnProfile';

type Props = {
  profile: Object,
  email: String,
  drawer: Boolean,
  closeDrawer: Function,
  openDrawer: Function,
  _toggleDrawer: Function,
  _closeDrawer: Function,
  _handleToggle: Function,
};

type State = {
  me: boolean,
};

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      me: false,
    };
    (this: any)._toggleDrawer = this._toggleDrawer.bind(this);
    (this: any)._closeDrawer = this._closeDrawer.bind(this);
    (this: any)._handleToggle = this._handleToggle.bind(this);
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
  _handleToggle(visible: boolean) {
    this.props.drawer === true
    ? this.props.closeDrawer()
    : this.props.openDrawer();
  }

  _closeDrawer() {
    this.props.closeDrawer();
  }

  _toggleDrawer() {
    this.props.openDrawer();
  }

  render() {
    const { profile } = this.props;

    const UserProfileBg = styled.div`
      width: 100%;
      height: 375px;
      background-image: url(${profile.profileImage});
      background-size: cover;
    `;
    const close = <Button icon onClick={ this._closeDrawer }>close</Button>;
    const header = (
     <Toolbar
       nav={ close }
       actions={ null }
       className="md-divider-border md-divider-border--bottom"
     />
   );
    const editButtons = (
      <Col xs>
      <Button primary raised label="Edit Profile" onClick={ this._toggleDrawer } />
      <Button secondary flat label="Upload Profile Image" />
      <Button secondary flat label="Upload Avatar" />
    </Col>
    );
    return (
      <div className="boldr-profile">
        <UserProfileBg />
        <Grid>
          <Paper zDepth={ 2 } style={ { marginTop: '-100px', padding: '1em', background: '#fff' } }>
            <Row>
              <Col sm={ 12 }>
               <Row>
               <Col xs>
                <Heading size={ 1 }>{ profile.firstName } { ' ' } { profile.lastName }'s Profile</Heading>
                </Col>
                {
                  this.state.me
                  ? editButtons
                  : null
                }
                </Row>
                <br />
                <br />
                { profile.email }<br />
              </Col>
            </Row>
             <Drawer
               clickableDesktopOverlay={ false }
               position="right"
               navItems={ null }
               visible={ this.props.drawer }
               onVisibilityToggle={ this._handleToggle }
               type={ Drawer.DrawerTypes.TEMPORARY }
               header={ header }
               style={ { zIndex: 100 } }
             >
               <OwnProfile profile={ profile } />
             </Drawer>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default Profile;
