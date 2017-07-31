/* @flow */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import { Grid, Col, Row } from '@boldr/ui/Layout';
import Icon from '@boldr/ui/Icons/Icon';
// internal
import Button from '@boldr/ui/Button';
import Headline from '@boldr/ui/Headline';
import Social from '@boldr/ui/Social';

import ProfileDetail from '../ProfileDetail';

const DetailList = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;
const ImgWrapper = styled.div`width: 100%;`;
const EditWrapper = styled.div`
  width: 100%;
  display: block;
  padding-top: 10px;
  margin-bottom: 30px;
`;
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
    <EditWrapper>
      <Link to="/account/preferences">
        <Button>Edit Profile</Button>
      </Link>
    </EditWrapper>
  );
  return (
    <div className="boldr-profile__content">
      <Grid>
        <Row>
          {props.me ? editButtons : null}

          <Col xs={12} md={6}>
            <img
              src={profile.avatarUrl}
              className="boldr-profile__avatar"
              alt={`${profile.username}'s avatar`}
            />
          </Col>
          <Col xs={12} md={6}>
            <Headline type="h1">
              {profile.firstName} {profile.lastName}'s Profile
            </Headline>

            <DetailList>
              <ProfileDetail
                label={<Icon kind="zap" color="#222" size="24" />}
                detail={profile.email}
              />
              <ProfileDetail
                label={<Icon kind="globe" color="#222" size="24" />}
                detail={profile.website}
              />
              <ProfileDetail
                label={<Icon kind="navigation" color="#222" size="24" />}
                detail={profile.location}
              />
              <ProfileDetail
                label={<Icon kind="account-card" color="#222" size="24" />}
                detail={profile.bio}
              />
            </DetailList>
            <Social
              facebook
              fburl={profile.socialMedia.facebookUrl}
              twitter
              turl={profile.socialMedia.twitterUrl}
              google
              gurl={profile.socialMedia.googleUrl}
              github
              ghurl={profile.socialMedia.githubUrl}
              linkedin
              lurl={profile.socialMedia.linkedinUrl}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default ProfileContent;
