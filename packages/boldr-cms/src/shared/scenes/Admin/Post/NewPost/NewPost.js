/* @flow */
import React from 'react';

import { PostEditorForm } from '../components';
import type { Post } from '../../../../types/models';

type Props = {
  drawer: boolean,
  onFormSubmit: Function,
  postImage: Object,
};

const NewPost = (props: Props) => {
  return (
    <div>
      <PostEditorForm
        drawer={ props.drawer }
        isEditing={ false }
        onSubmit={ props.onFormSubmit }
        postImage={ props.postImage }
      />
    </div>
  );
};

export default NewPost;
