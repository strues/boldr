/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import hasWindow from '@boldr/utils/lib/dom/hasWindow';
import { Grid } from '@boldr/ui/Layout';
import type { ArticleType } from '../../../../types/boldr';
import NewArticleForm from './components/NewArticleForm';

type Props = {
  onSubmit: Function,
  data: Object,
};

const NewArticle = (props: Props) => {
  const handleOnSubmit = (values: ArticleType) => {
    props.onSubmit(values);
  };

  return (
    <Grid>
      <Helmet title="Admin: New Post" />
      <NewArticleForm onSubmit={handleOnSubmit} categories={props.data.categories} />
    </Grid>
  );
};

export default NewArticle;
