/* @flow */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Grid, Col, Row, StyleClasses } from 'boldr-ui';
import ProfileContent from './components/ProfileContent';

type Props = {
  profile: Object,
  me: boolean,
};
const BASE_ELEMENT = StyleClasses.PROFILE;
const Profile = ({ profile, me }: Props) => {
  const classes = classnames(BASE_ELEMENT);

  return (
    <div className={classes}>
      <Grid>
        <div className="profile__content">
          <Row>
            <Col sm={12}>
              <ProfileContent me={me} profile={profile} />
            </Col>
          </Row>
        </div>
      </Grid>
    </div>
  );
};

export default Profile;
