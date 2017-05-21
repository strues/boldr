/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { gql, graphql } from 'react-apollo';
import { Loader } from 'boldr-ui';

type Props = {
  currentTag: Object,
  isFetching: boolean,
  name: string,
  listTags: Object,
  match: Object,
};

class TaggedPost extends Component {
  props: Props;
  render() {
    const { articlesByTag, loading } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    if (!articlesByTag) {
      return <div>No posts matching the tag</div>;
    }

    return (
      <div>
        <Toolbar>
          <ToolbarTitle text={`Posts tagged ${this.props.match.params.name}`} />
        </Toolbar>
        <List>
          {articlesByTag.map(post => (
            <ListItem key={post.id} primaryText={post.title} />
          ))}
        </List>
      </div>
    );
  }
}

export default graphql(
  gql`
  query tags($name: String!, $offset: Int!, $limit: Int!) {
    articlesByTag(name: $name, offset: $offset, limit: $limit) {
      id,
      title,
      slug,
      featureImage,
      featured,
      backgroundImage,
      published,
      createdAt,
      excerpt,
      userId,
      tags {
        id,
        name
      },
    }
  }
`,
  {
    options: props => ({
      variables: {
        name: props.match.params.name,
        limit: 20,
        offset: 0,
      },
    }),
  },
)(TaggedPost);