/* @flow */
import React from 'react';
import { Divider, Paper, Col, Heading, Icon } from '@boldr/ui';
import ArticleDate from '../ArticleDate';

type Props = {
  title: String,
  content: String,
  featureImage: ?String,
  createdAt: Date,
};

const ArticleContent = (props: Props) => {
  function createMarkup() {
    return {
      __html: props.content,
    };
  }
  return (
    <article>
      <Paper
        zDepth={2}
        style={{
          padding: '1em',
          marginBottom: '50px',
        }}
        className="boldr-paperoverride"
      >

        <ArticleDate created={props.createdAt} />
        <Divider />
        <div
          className="boldr-post__content"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </Paper>
    </article>
  );
};

export default ArticleContent;
