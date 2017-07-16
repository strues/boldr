/* @flow */
import React from 'react';
import classnames from 'classnames';
import Loader from '@boldr/ui/Loader';
import { graphql } from 'react-apollo';
import { StyleClasses } from '../../../../theme/styleClasses';

import Author from '../Author';
import SidebarTags from '../SidebarTags';
import SIDEBAR_QUERY from '../../gql/user.graphql';

export type Props = {
  className: ?string,
  authorClassName: ?string,
  tagsClassName: ?string,
  tags: Array<Tag>,
  data: Object,
};

const BASE_ELEMENT = StyleClasses.ARTICLE_SIDEBAR;

export const ArticleSidebar = (props: Props) => {
  const { getUserByUserId, loading } = props.data;
  const classes = classnames(BASE_ELEMENT, props.className);
  if (loading) {
    return <Loader className="boldrloader" />;
  }
  return (
    <aside className={classes}>
      <Author className={props.authorClassName} author={getUserByUserId} />
      <SidebarTags tags={props.tags} className={props.tagsClassName} />
    </aside>
  );
};

export default graphql(SIDEBAR_QUERY, {
  options: props => ({
    variables: {
      userId: props.authorId,
    },
  }),
})(ArticleSidebar);
