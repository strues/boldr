/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
// $FlowIssue
import styled from 'styled-components';
import Button from 'boldr-ui/lib/components/Button';
import { FontIcon, Col, Row, Headline } from 'boldr-ui';

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
      <Link to="/account/preferences">
        <Button>Edit Profile</Button>
      </Link>
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
            <Headline type="h1">
              {profile.firstName} {' '} {profile.lastName}'s Profile
            </Headline>
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
