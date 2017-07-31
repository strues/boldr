/* @flow */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import Link from 'react-router-dom/Link';
import { Avatar, Headline, Social } from '@boldr/ui';
import { StyleClasses } from '../../../../theme/styleClasses';

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
  const authorName = (
    <Link to={`/profiles/${author.username}`}>
      {author.username}
    </Link>
  );
  return (
    <div className={classes}>
      <AvatarName>
        <Avatar src={author.avatarUrl} role="presentation" />
      </AvatarName>
      <AvatarName>
        <Headline type="h3">
          {authorName}
        </Headline>
      </AvatarName>
      <BioBlock>
        {author.bio}
      </BioBlock>
      <Social
        facebook
        fburl={author.socialMedia.facebookUrl}
        twitter
        turl={author.socialMedia.twitterUrl}
        google
        gurl={author.socialMedia.googleUrl}
        github
        ghurl={author.socialMedia.githubUrl}
        linkedin
        lurl={author.socialMedia.linkedinUrl}
      />
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
