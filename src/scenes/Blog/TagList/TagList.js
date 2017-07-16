/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import { Grid, Col, Row } from '@boldr/ui/Layout';
import Loader from '../../../components/Loader';
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
  if (!getArticlesForTag || loading) {
    return <Loader />;
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
