/* @flow */
import React from 'react';

import { NewPostForm } from '../components';
import type { Post } from '../../../../types/models';

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
