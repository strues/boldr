/* @flow */
import React from 'react';
import classnames from 'classnames';
import { Divider, Paper, Col, Heading, Icon } from '@boldr/ui';
import { StyleClasses } from '../../../../theme/styleClasses';
import ArticleDate from '../ArticleDate';

export type Props = {
  title?: string,
  content: string,
  featureImage?: string,
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
