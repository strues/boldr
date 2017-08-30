/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import hasWindow from '@boldr/utils/lib/dom/hasWindow';
import { Grid } from '@boldr/ui/Layout';
import type { Article } from '../../../../types/boldr';
import NewArticleForm from './components/NewArticleForm';

type Props = {
  onSubmit: Function,
};

const NewArticle = (props: Props) => {
  const handleOnSubmit = (values: Article) => {
    values.content = hasWindow ? window.localStorage.getItem('htmlContent') : '';
    props.onSubmit(values);
  };

  return (
    <Grid>
      <Helmet title="Admin: New Post" />
      <NewArticleForm onSubmit={handleOnSubmit} />
    </Grid>
  );
};

export default NewArticle;
