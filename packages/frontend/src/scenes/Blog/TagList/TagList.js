/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { Grid, Col, Row } from '@boldr/ui/Layout';
import Loader from '@boldr/ui/Loader';
import ArticleCard from '../components/ArticleCard';

type Props = {
  data: Data,
  match: Object,
};

interface Data {
  getArticlesForTag: Array<Article>,
  loading: boolean,
}

const TagList = (props: Props) => {
  const { data: { loading, getArticlesForTag }, match: { params } } = props;
  if (loading) {
    return <Loader />;
  }
  if (!getArticlesForTag) {
    return <h1>No matching posts</h1>;
  }
  return (
    <div>
      <Helmet title={`Posts tagged ${params.name}`} />
      <Grid>
        <Row>
          {getArticlesForTag.map(article =>
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
