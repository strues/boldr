/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import NewArticleForm from './components/NewArticleForm';

type Props = {
  onFormSubmit: Function,
  postImage: string,
  uploadImageForArticle: () => void,
};

const NewArticle = (props: Props) => {
  return (
    <div>
      <Helmet title="Admin: New Post" />
      <NewArticleForm
        uploadImageForArticle={props.uploadImageForArticle}
        onSubmit={props.onFormSubmit}
        postImage={props.postImage}
      />
    </div>
  );
};

export default NewArticle;
