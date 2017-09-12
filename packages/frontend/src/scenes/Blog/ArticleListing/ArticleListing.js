/* @flow */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Section } from '@boldr/ui/Layout';
import Heading from '@boldr/ui/Heading';
import Loader from '@boldr/ui/Loader';
import { ArticleCard } from '../components';
import type { ArticlesType } from 'types/boldr';

type Props = {
  articles: ArticlesType,
  isLoading: boolean,
  error?: Object,
};

const Container = styled.div`
  flex: 1;
  max-width: 1034px;
  width: 100%;
  margin: 30px auto 100px;
  display: flex;
  flex-wrap: wrap;
`;
class ArticleListing extends PureComponent<Props, *> {
  props: Props;

  renderArticles = () => {
    const { articles } = this.props;
    return articles.map(article => <ArticleCard key={article.id} {...article} />);
  };

  render() {
    const { isLoading } = this.props;

    return (
      <div>
        <Section>
          <Heading type="h2" text="Blog" />
        </Section>
        <Container>{isLoading ? <Loader /> : this.renderArticles()}</Container>
      </div>
    );
  }
}

export default ArticleListing;
