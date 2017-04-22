/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { Col, Row } from 'boldr-ui';
import NewPostForm from './components/NewPostForm';

type Props = {
  onFormSubmit: Function,
  postImage: string,
};

const NewPost = (props: Props) => {
  return (
    <div>
      <Helmet title="Admin: New Post" />
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <NewPostForm
            onSubmit={props.onFormSubmit}
            postImage={props.postImage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default NewPost;
