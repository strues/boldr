/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses, Paper, Divider, Heading } from '@boldr/ui';
import Flex from '../../../../components/Flex';
import type { TagsType } from '../../../../types/boldr';
import DynamicContent from '../../../../components/DynamicContent';
import ArticleDate from '../ArticleDate';
import TagBlock from '../TagBlock';

export type Props = {
  content: string,
  createdAt: Date,
  className?: string,
  tags: TagsType,
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
        <Flex align="center" justify="space-between">
          <ArticleDate created={props.createdAt} /> <TagBlock tags={props.tags} />
        </Flex>

        <Divider />
        <DynamicContent className={classes} dangerouslySetInnerHTML={createMarkup()} />
      </Paper>
    </article>
  );
};

export default ArticleContent;
