/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
// internal
import Heading from '@boldr/ui/Heading';
import Paragraph from '@boldr/ui/Paragraph';
import Loader from '@boldr/ui/Loader';
import { ArticleCard } from '../../scenes/Blog/components';
import type { ArticlesType } from '../../types/boldr';

const HomeHero = styled.div`
  position: relative;
  background-color: #261d16;
  background-image: url("${props => props.bgsrc}");
  background-size: cover;
  height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  color: white;
  h1,
  p {
    z-index: 2;
  }
`;

const HomeText = 'Meet Boldr.';
const Container = styled.div`
  flex: 1;
  max-width: 1034px;
  width: 100%;
  margin: 30px auto 100px;
  display: flex;
  flex-wrap: wrap;
`;
const CoverShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-image: linear-gradient(0, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  z-index: 0;
`;
type Props = {
  articles: ArticlesType,
  isLoading: boolean,
  error?: Object,
};

class Home extends React.Component<Props, *> {
  renderArticles = () => {
    const { articles } = this.props;
    return articles.map(article => <ArticleCard key={article.id} {...article} />);
  };
  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <Helmet title="Home" />
        <HomeHero bgsrc="http://i.magaimg.net/img/1f5w.jpg">
          <CoverShadow />
          <Heading type="h1" text={HomeText} isLight />
        </HomeHero>
        <Container>{isLoading ? <Loader /> : this.renderArticles()}</Container>
      </div>
    );
  }
}

export default Home;
