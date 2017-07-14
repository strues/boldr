/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import NewArticleForm from './components/NewArticleForm';

type Props = {
  onSubmit: Function,
};

const NewArticle = (props: Props) => {
  const handleOnSubmit = (values: Article) => {
    props.onSubmit(values);
  };

  return (
    <div>
      <Helmet title="Admin: New Post" />
      <NewArticleForm onSubmit={handleOnSubmit} />
    </div>
  );
};

export default NewArticle;
