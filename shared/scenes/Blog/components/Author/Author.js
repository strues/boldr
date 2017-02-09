/* @flow */
import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import Avatar from 'react-md/lib/Avatars';

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

const Author = (props: { username: String, avatar_url: String, last_name: String, first_name: String }) => {
  const authorName = <Link to={ `/profiles/${props.username}`}>{ props.username }</Link>;
  return (
    <div className="boldr-post__sidebar-author">
      <AuthorInfo>
        <AvatarName><Avatar src={ props.avatar_url } role="presentation" /> </AvatarName>
        <AvatarName>{ authorName }</AvatarName>
      </AuthorInfo>
      </div>
  );
};

export default Author;
