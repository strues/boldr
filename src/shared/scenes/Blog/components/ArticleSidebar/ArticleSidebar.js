/* @flow */
import React from 'react';
import classnames from 'classnames';
import { Headline, Loader } from '@boldr/ui';
import { gql, graphql } from 'react-apollo';
import { StyleClasses } from '../../../../theme/styleClasses';

import Author from '../Author';
import SidebarTags from '../SidebarTags';

type Props = {
  className: ?string,
  authorClassName: ?string,
  tagsClassName: ?string,
  tags: Array<Tag>,
  data: Object,
};
const BASE_ELEMENT = StyleClasses.POST_SIDEBAR;
const ArticleSidebar = (props: Props) => {
  const { getUserByUserId, loading } = props.data;
  const classes = classnames(BASE_ELEMENT, props.className);
  if (loading) {
    return <Loader />;
  }
  return (
    <aside className={classes}>
      <Author className={props.authorClassName} author={getUserByUserId} />
      <SidebarTags tags={props.tags} className={props.tagsClassName} />
    </aside>
  );
};

export const SIDEBAR_QUERY = gql`
  query($userId: UUID!) {
      getUserByUserId(userId: $userId) {
        username,
        avatarUrl,
        bio,
        socialMedia {
          facebookUrl,
          githubUrl,
          twitterUrl,
          linkedinUrl,
          googleUrl,
          stackoverflowUrl
        }
      }
  }
`;

export default graphql(SIDEBAR_QUERY, {
  options: props => ({
    variables: {
      userId: props.authorId,
    },
  }),
})(ArticleSidebar);
