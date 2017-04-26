/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { Col, Row } from 'boldr-ui';
import draftToHtml from 'draftjs-to-html';
import NewPostForm from './components/NewPostForm';

type Props = {
  createPost: () => void,
  postImage: string,
};

const NewPost = (props: Props) => {
  function handleOnSubmit(values: Post) {
    const postData = {
      title: values.title,
      tags: values.tags,
      excerpt: values.excerpt,
      featureImage: props.postImage.url || values.featureImage,
      published: values.published,
      rawContent: values.content,
      content: draftToHtml(values.content),
      meta: values.meta,
    };
    props.createPost(postData);
  }
  return (
    <div>
      <Helmet title="Admin: New Post" />
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <NewPostForm onSubmit={handleOnSubmit} postImage={props.postImage} />
        </Col>
      </Row>
    </div>
  );
};

export default NewPost;
