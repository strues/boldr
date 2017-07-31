/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses, Paper, Divider } from '@boldr/ui';
import ArticleDate from '../ArticleDate';

export type Props = {
  content: string,
  createdAt: Date,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.ARTICLE_CONTENT;

const ArticleContent = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  function createMarkup() {
    return {
      __html: props.content,
    };
  }
  return (
    <article>
      <Paper zDepth={2}>
        <ArticleDate created={props.createdAt} />
        <Divider />
        <div className={classes} dangerouslySetInnerHTML={createMarkup()} />
      </Paper>
    </article>
  );
};

export default ArticleContent;
