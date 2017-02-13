/* @flow */
import React from 'react';
import Paper from 'react-md/lib/Papers';
import Drawer from 'react-md/lib/Drawers';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import { Grid, Col, Row, Heading, Modal } from '../../../../components';

type Props = {
  profile: Object,
  toggleDrawer: Function,
  me: boolean,
};

const ProfileContent = (props: Props) => {
  const { profile } = props;

  const editButtons = (
    <Col xs>
      <Button primary raised label="Edit Profile" onClick={ props.toggleDrawer } />
      <Button secondary flat label="Upload Profile Image" />
      <Button secondary flat label="Upload Avatar" />
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
      { profile.social.facebook.url }<br />
      { profile.social.twitter.url }<br />
      { profile.social.linkedin.url }<br />
      { profile.social.github.url }<br />
      { profile.social.google.url }<br />
    </div>
  );
};

export default ProfileContent;
