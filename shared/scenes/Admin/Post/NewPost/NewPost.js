/* @flow */
import React from 'react';
import type { Post } from '../../../../types/models';
import NewPostForm from './components/NewPostForm';

type Props = {
  onFormSubmit: Function,
  postImage: Object,
};

const NewPost = (props: Props) => {
  return (
    <div>
      <NewPostForm
        onSubmit={ props.onFormSubmit }
        postImage={ props.postImage }
      />
    </div>
  );
};

export default NewPost;
