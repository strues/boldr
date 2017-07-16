/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { gql, graphql } from 'react-apollo';

import Loader from '@boldr/ui/Loader';
import ARTICLES_TAG_QUERY from '../../gql/articlesTag.graphql';

type Props = {
  data: Object,
  isFetching: boolean,
  name: string,
  listTags: Object,
  match: Object,
};

class TaggedPost extends Component {
  props: Props;
  render() {
    const { getArticlesForTag, loading } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    if (!getArticlesForTag) {
      return <div>No posts matching the tag</div>;
    }

    return (
      <div>
        <div>
          {`Posts tagged ${this.props.match.params.name}`}
        </div>
        <ul>
          {getArticlesForTag.map(post =>
            <li key={post.id}>
              {post.title}
            </li>,
          )}
        </ul>
      </div>
    );
  }
}

export default graphql(ARTICLES_TAG_QUERY, {
  options: props => ({
    variables: {
      name: props.match.params.name,
      limit: 20,
      offset: 0,
    },
  }),
})(TaggedPost);
