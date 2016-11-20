/* @flow */
import React from 'react';
import { Loader, Icon, Button, Segment } from 'semantic-ui-react';
import { Row, Col } from 'components/index';
import PostCard from '../components/PostCard';
import type { Post } from '../../../types/models';

export type Props = {
  posts: Array<Post>,
  layout: Object,
  handleChangeLayout: () => void
};

const PostListing = (props: Props) => {
  if (!props.posts) {
    return (
      <Loader content="loading" />
    );
  }

  const gridView = (
    <Row>
      {
        props.posts.map((post, i) =>
          <Col key={ i } xs={ 12 } md={ 4 }>
            <PostCard { ...post } />
          </Col>)
      }
    </Row>
  );

  const listView = (
    <div>
      {
        props.posts.map((post, i) =>
          <Col key={ i } xs={ 12 }>
            <PostCard { ...post } />
          </Col>)
      }
    </div>
  );

  return (
    <div>
      <Segment padded>
        Recent Posts
        <Button onClick={ props.handleChangeLayout } floated="right" icon>
          { props.layout === 'grid' ?
            <Icon name="list layout" /> :
            <Icon name="grid layout" />
          }
        </Button>
      </Segment>
      {
        props.layout === 'grid' ? gridView : listView
      }
    </div>
  );
};

export default PostListing;
