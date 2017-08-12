/* @flow */
import React from 'react';
import { graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
import Tags from './Tags';
import TAGS_QUERY from './gql/tags.graphql';

interface Data {
  getTags: Array<Tag>,
  loading: boolean,
}

type Props = {
  data: Data,
};

const TagsContainer = (props: Props) => {
  const { loading, getTags } = props.data;
  if (loading) {
    return <Loader />;
  }
  return <Tags tags={getTags} />;
};
// $FlowIssue
export default graphql(TAGS_QUERY, {
  // $FlowIssue
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(TagsContainer);
