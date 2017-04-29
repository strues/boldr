/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import NewPostForm from './components/NewPostForm';

type Props = {
  onFormSubmit: () => void,
  postImage: string,
  uploadImageForPost: () => void,
};

const NewPost = (props: Props) => {
  return (
    <div>
      <Helmet title="Admin: New Post" />
      <NewPostForm
        uploadImageForPost={props.uploadImageForPost}
        onSubmit={props.onFormSubmit}
        postImage={props.postImage}
      />
    </div>
  );
};

export default NewPost;
