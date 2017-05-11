/* @flow */
import React from 'react';
import { Headline } from 'boldr-ui';

const ArticleTitle = (props: { title: string }) => {
  return <Headline type="h1">{props.title}</Headline>;
};

export default ArticleTitle;
