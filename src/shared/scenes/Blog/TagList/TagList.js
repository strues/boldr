/* @flow */

import React from 'react';
import { Grid, Col, Row, Loader } from 'boldr-ui';
import ArticleCard from '../components/ArticleCard';

type Props = {
  articles: Array<Article>,
  listTags: Object,
};

const TagList = (props: Props) => {
  if (!props.articles) {
    return <Loader />;
  }
  return (
    <div>
      <Grid>
        <Row>
          {props.articles.map(article => (
            <Col key={article.id} xs={12} md={4}>
              <ArticleCard listTags={props.listTags} {...article} />
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
};

export default TagList;
