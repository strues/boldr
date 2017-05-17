/* @flow */
import React from 'react';
import classnames from 'classnames';
import { Headline, Col, Loader, StyleClasses } from 'boldr-ui';
import { gql, graphql } from 'react-apollo';
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
  const { userById, loading } = props.data;
  const classes = classnames(BASE_ELEMENT, props.className);
  if (loading) {
    return <Loader />;
  }
  return (
    <aside className={classes}>
      <Author className={props.authorClassName} author={userById} />
      <SidebarTags tags={props.tags} className={props.tagsClassName} />
    </aside>
  );
};

export const SIDEBAR_QUERY = gql`
  query ($id: String!) {
      userById(id: $id) {
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
      id: props.authorId,
    },
  }),
})(ArticleSidebar);
