/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import hasWindow from '@boldr/utils/lib/dom/hasWindow';
import type { ArticleType } from '../../../../types/boldr';
import NewArticleForm from './components/NewArticleForm';

type Props = {
  onSubmit: Function,
};

const NewArticle = (props: Props) => {
  const handleOnSubmit = (values: ArticleType) => {
    values.content = hasWindow ? window.localStorage.getItem('htmlContent') : '';
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
