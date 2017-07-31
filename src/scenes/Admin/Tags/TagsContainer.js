/* @flow */
import React from 'react';
import { graphql } from 'react-apollo';
// internal
import Loader from '@boldr/ui/Loader';
import Tags from './Tags';
import TAGS_QUERY from './gql/tags.graphql';

type Props = {
  data: Data,
};
interface Data {
  getTags: Array<Tag>,
  loading: boolean,
}

const TagsContainer = (props: Props) => {
  const { loading, getTags } = props.data;
  if (loading) {
    return <Loader />;
  }
  return <Tags tags={getTags} />;
};

export default graphql(TAGS_QUERY, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(TagsContainer);
