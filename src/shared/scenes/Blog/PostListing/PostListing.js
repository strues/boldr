/* @flow */
import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col, Loader, FontIcon, Button } from 'boldr-ui';

import { FeaturedPost, PostCard } from '../components';

type Props = {
  features: Array<Post>,
  posts: Array<Post>,
  layout: Object,
  isFetching: Boolean,
  listTags: Object,
  handleChangeLayout: () => void,
};
const CardSpacer = styled.div`
  margin-bottom: 50px;
`;
const FeaturedArea = styled.section`
  padding-top: 50px;
  margin-bottom: 40px;
`;
const PostListing = (props: Props) => {
  if (props.isFetching || !props.posts) {
    return <Loader />;
  }

  const gridView = (
    <Row>
      {props.posts.map(post => (
        <Col key={post.id} xs={12} md={4}>
          <CardSpacer>
            <PostCard {...post} listTags={props.listTags} />
          </CardSpacer>
        </Col>
      ))}
    </Row>
  );

  const listView = (
    <div>
      {props.posts.map(post => (
        <Col key={post.id} xs={12}>
          <PostCard {...post} listTags={props.listTags} />
        </Col>
      ))}
    </div>
  );

  return (
    <Grid>
      <FeaturedArea>
        {props.features.map(post => (
          <Col key={post.id} xs={12}>
            <FeaturedPost {...post} listTags={props.listTags} />
          </Col>
        ))}
      </FeaturedArea>
      {props.layout === 'grid' ? gridView : listView}
      {props.layout === 'grid'
        ? <Button floating fixed secondary onClick={props.handleChangeLayout}>
            <FontIcon>view_list</FontIcon>
          </Button>
        : <Button floating fixed secondary onClick={props.handleChangeLayout}>
            <FontIcon>view_module</FontIcon>
          </Button>}
    </Grid>
  );
};

export default PostListing;
