/* @flow */

import React from 'react';
import { Grid, Col, Row } from '@boldr/ui/Layout';
import Loader from '../../../components/Loader';
import ArticleCard from '../components/ArticleCard';

type Props = {
  articles: Array<Article>,
};

const TagList = (props: Props) => {
  if (!props.articles) {
    return <Loader />;
  }
  return (
    <div>
      <Grid>
        <Row>
          {props.articles.map(article =>
            <Col key={article.id} xs={12} sm={4}>
              <ArticleCard listTags={article.tags} article={article} />
            </Col>,
          )}
        </Row>
      </Grid>
    </div>
  );
};

export default TagList;
