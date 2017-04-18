/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import NewPostForm from './components/NewPostForm';

type Props = {
  onFormSubmit: Function,
  postImage: string,
};

const NewPost = (props: Props) => {
  return (
    <div>
      <Helmet title="Admin: New Post" />
      <NewPostForm onSubmit={props.onFormSubmit} postImage={props.postImage} />
    </div>
  );
};

export default NewPost;
