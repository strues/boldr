/* @flow */
import React from 'react';
import styled from 'styled-components';
import {
  Paper,
  Drawer,
  Button,
  FontIcon,
  Toolbar,
  Grid,
  Col,
  Row,
  Heading,
  Modal,
  Icon,
  Social,
} from 'boldr-ui';

import ProfileDetail from '../ProfileDetail';

const DetailList = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;
const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
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
      <Button
        primary
        raised
        label="Edit Profile"
        onClick={props.toggleDrawer}
      />
      <Button
        secondary
        flat
        label="Upload Profile Image"
        onClick={props.handleProfileImgClick}
      />
      <Button
        secondary
        flat
        label="Upload Avatar"
        onClick={props.handleAvatarImgClick}
      />
    </EditWrapper>
  );
  return (
    <div className="boldr-profile__content">
      <Row xsEnd>

        {props.me ? editButtons : null}
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <ImgWrapper>
            <img
              src={profile.avatarUrl}
              className="boldr-profile__avatar"
              alt={`${profile.username}'s avatar`}
            />
          </ImgWrapper>
        </Col>
        <Col sm={12} md={6}>
          <Col xs>
            <Heading size={1}>
              {profile.firstName} {' '} {profile.lastName}'s Profile
            </Heading>
          </Col>
          <DetailList>
            <ProfileDetail
              label={<FontIcon>email</FontIcon>}
              detail={profile.email}
            />
            <ProfileDetail
              label={<FontIcon>web</FontIcon>}
              detail={profile.website}
            />
            <ProfileDetail
              label={<FontIcon>location_on</FontIcon>}
              detail={profile.location}
            />
            <ProfileDetail
              label={<FontIcon>library_books</FontIcon>}
              detail={profile.bio}
            />
          </DetailList>
          {/* <Social
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
          /> */}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileContent;
