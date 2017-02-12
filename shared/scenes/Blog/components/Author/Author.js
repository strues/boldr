/* @flow */
import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import Avatar from 'react-md/lib/Avatars';
import { Heading, Col } from '../../../../components/index';

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
const Author = (props: { username: String, avatar_url: String, last_name: String, first_name: String }) => {
  const authorName = <Link to={ `/profiles/${props.username}`}>{ props.username }</Link>;
  return (
    <div className="boldr-post__sidebar-author">
      <Heading size={ 3 }>Author Details</Heading>
      <AuthorInfo>
        <AvatarName><Avatar src={ props.avatar_url } role="presentation" /> </AvatarName>
        <AvatarName>{ authorName }</AvatarName>
        <BioBlock>{ props.bio }</BioBlock>
      </AuthorInfo>
      </div>
  );
};

export default Author;
