/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import NewArticleForm from './components/NewArticleForm';

type Props = {
  onFormSubmit: Function,
};

const NewArticle = (props: Props) => {
  return (
    <div>
      <Helmet title="Admin: New Post" />
      <NewArticleForm onSubmit={props.onFormSubmit} />
    </div>
  );
};

export default NewArticle;
