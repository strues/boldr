/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
// internal
import Loader from '~components/Loader';
import Tags from './Tags';

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

export default graphql(
  gql`
  query getTags($offset: Int!, $limit: Int!) {
      getTags(offset:$offset,limit:$limit) {
        id,
        name,
        description,
      }
  }
`,
  {
    options: props => ({
      variables: {
        offset: 0,
        limit: 20,
      },
    }),
  },
)(TagsContainer);
