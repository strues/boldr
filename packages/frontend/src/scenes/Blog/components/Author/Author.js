/* @flow */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import Link from 'react-router-dom/Link';
import Avatar from '@boldr/ui/Avatar';
import Heading from '@boldr/ui/Heading';
import { StyleClasses } from '@boldr/ui/theme/styleClasses';

const BASE_ELEMENT = StyleClasses.ARTICLE_SIDEBAR_AUTHOR;

const AvatarName = styled.div`
  display: inline-block;
  vertical-align: middle;
  &:first-child {
    margin-right: 15px;
  }
`;

const BioBlock = styled.div`
  vertical-align: middle;
  margin-bottom: 15px;
  padding-top: 10px;
`;

export type Props = {
  className: string,
  author: Object,
};

const Author = (props: Props) => {
  const { author } = props;
  const classes = classnames(BASE_ELEMENT, props.className);

  return (
    <div className={classes}>
      <AvatarName>
        <Avatar src={author.profile.avatarUrl} role="presentation" />
      </AvatarName>
      <AvatarName>
        <Link to={`/profiles/${author.profile.username}`}>
          <Heading type="h3" text={author.profile.username} />
        </Link>
      </AvatarName>
      <BioBlock>{author.profile.bio}</BioBlock>
    </div>
  );
};
const defaultProps = {
  author: {
    username: 'Placeholder',
  },
};
Author.defaultProps = defaultProps;
export default Author;
