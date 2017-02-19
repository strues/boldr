/* @flow */
import React from 'react';
import Paper from 'react-md/lib/Papers';
import Drawer from 'react-md/lib/Drawers';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import { Grid, Col, Row, Heading, Modal, Icon, Social } from '../../../../components';

type Props = {
  profile: Object,
  toggleDrawer: Function,
  handleAvatarImgClick: Function,
  handleProfileImgClick: Function,
  me: boolean,
};

const ProfileContent = (props: Props) => {
  const { profile } = props;

  const editButtons = (
    <Col xs>
      <Button primary raised label="Edit Profile" onClick={ props.toggleDrawer } />
      <Button secondary flat label="Upload Profile Image" onClick={ props.handleProfileImgClick } />
      <Button secondary flat label="Upload Avatar" onClick={ props.handleAvatarImgClick } />
    </Col>
  );
  return (
    <div className="boldr-profile__content">
      <Row>
        <Col xs>
          <Heading size={ 1 }>{ profile.firstName } { ' ' } { profile.lastName }'s Profile</Heading>
        </Col>
        {
          props.me ? editButtons : null
        }
      </Row>
      <br />
      <br />
      { profile.email }<br />
      { profile.website }<br />
      { profile.location }<br />
      { profile.bio }<br />
      <Social
        facebook
        fburl={ profile.social.facebook.url }
        twitter
        turl={ profile.social.twitter.url }
        google
        gurl={ profile.social.google.url }
        github
        ghurl={ profile.social.github.url }
        linkedin
        lurl={ profile.social.linkedin.url }
      />

    </div>
  );
};

export default ProfileContent;
