/* @flow */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
// internal
import Loader from '@boldr/ui/Loader';
import Tags from './Tags';
import TAGS_QUERY from './tags.graphql';

type Props = {
  data: Data,
};
type Data = {
  getTags: Array<Tag>,
  loading: boolean,
};

class TagsContainer extends Component {
  props: Props;

  render() {
    const { loading, getTags } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return <Tags tags={getTags} />;
  }
}

export default graphql(TAGS_QUERY, {
  options: props => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(TagsContainer);
