/* @flow */
import React from 'react';

import { NewPostForm } from '../components';
import type { Post } from '../../../../types/models';

type Props = {
  drawer: boolean,
  onFormSubmit: Function,
  postImage: Object,
};

const NewPost = (props: Props) => {
  return (
    <div>
      <NewPostForm
        drawer={ props.drawer }
        onSubmit={ props.onFormSubmit }
        postImage={ props.postImage }
      />
    </div>
  );
};

export default NewPost;
