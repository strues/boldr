/* @flow */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import { Grid, Col, Row } from '@boldr/ui/Layout';
import { Bolt, At, MapPin, AddressCard } from '@boldr/ui/Icons';
// internal
import Button from '@boldr/ui/Button';
import Heading from '@boldr/ui/Heading';
import type { ProfileType } from '../../../../types/boldr';
import ProfileDetail from '../ProfileDetail';

const DetailList = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;

const EditWrapper = styled.div`
  width: 100%;
  display: block;
  padding-top: 10px;
  margin-bottom: 30px;
`;
type Props = {
  profile: ProfileType,
};

const ProfileContent = (props: Props) => {
  const { profile } = props;
  // eslint-disable-next-line no-unused-vars
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
          <Col xs={12} md={6}>
            <img
              src={profile.avatarUrl}
              className="boldr-profile__avatar"
              alt={`${profile.username}'s avatar`}
            />
          </Col>
          <Col xs={12} md={6}>
            <Heading type="h1">
              {profile.firstName} {profile.lastName}'s Profile
            </Heading>

            <DetailList>
              <ProfileDetail label={<Bolt fill="#222" size={24} />} detail={profile.email} />
              <ProfileDetail label={<At fill="#222" size={24} />} detail={profile.website} />
              <ProfileDetail label={<MapPin fill="#222" size={24} />} detail={profile.location} />
              <ProfileDetail label={<AddressCard fill="#222" size={24} />} detail={profile.bio} />
            </DetailList>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default ProfileContent;
