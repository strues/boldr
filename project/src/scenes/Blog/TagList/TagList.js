/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Section } from '@boldr/ui/Layout';
import Heading from '@boldr/ui/Heading';
import Loader from '@boldr/ui/Loader';
import type { ArticlesType, MatchParams } from '../../../types/boldr';
import ArticleCard from '../components/ArticleCard';

type Props = {
  isLoading: boolean,
  articles: ArticlesType,
  match: MatchParams,
};

const Container = styled.div`
  flex: 1;
  max-width: 1034px;
  width: 100%;
  margin: 30px auto 100px;
  display: flex;
  flex-wrap: wrap;
`;
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
      <Section>
        <Heading type="h2" text={params.name} />
      </Section>
      <Container>
        {articles ? (
          articles.map(article => <ArticleCard key={article.id} featured={false} {...article} />)
        ) : (
          <Loader />
        )}
      </Container>
    </div>
  );
};

export default TagList;
