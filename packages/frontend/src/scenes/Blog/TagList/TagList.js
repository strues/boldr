/* @flow */

import React from 'react';
import Helmet from 'react-helmet';

import Loader from '@boldr/ui/Loader';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import type { ArticlesType, MatchParams } from '../../../types/boldr';
import ArticleCard from '../components/ArticleCard';

type Props = {
  isLoading: boolean,
  articles: ArticlesType,
  match: MatchParams,
};

const TagList = (props: Props) => {
  const { isLoading, articles, match: { params } } = props;
  if (isLoading) {
    return <Loader />;
  }
  if (!articles) {
    return <h1>No matching posts</h1>;
  }
  return (
    <div>
      <Helmet title={`Posts tagged ${params.name}`} />
      <Grid>
        <Row>
          {articles.map(article => (
            <Col key={article.id} xs={12} sm={4}>
              <ArticleCard listTags={article.tags} article={article} />
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
};

export default TagList;
