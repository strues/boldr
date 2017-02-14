/* @flow */
import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import Avatar from 'react-md/lib/Avatars';
import { Heading, Col, Social } from '../../../../components/index';

const AuthorInfo = styled.ul`
  list-style-type: none;
  padding-left: 0;

`;

const AvatarName = styled.li`
  display: inline-block;
  vertical-align: middle;
  &:first-child {
    margin-right: 15px;
  }
`;
const BioBlock = styled.li`
  vertical-align: middle;
`;

type Props = {
  username: String,
  avatar_url: String,
  last_name: String,
  first_name: String,
  bio: String,
  social: Object,
};
const Author = (props: Props) => {
  const authorName = <Link to={ `/profiles/${props.username}` }>{ props.username }</Link>;
  return (
    <div className="boldr-post__sidebar-author">
      <Heading size={ 3 }>Author Details</Heading>
      <AuthorInfo>
        <AvatarName><Avatar src={ props.avatar_url } role="presentation" /> </AvatarName>
        <AvatarName>{ authorName }</AvatarName>
        <BioBlock>{ props.bio }</BioBlock>
        <Social
          facebook
          fburl={ props.social.facebook.url }
          twitter
          turl={ props.social.twitter.url }
          google
          gurl={ props.social.google.url }
          github
          ghurl={ props.social.github.url }
          linkedin
          lurl={ props.social.linkedin.url }
        />
      </AuthorInfo>
      </div>
  );
};

export default Author;
