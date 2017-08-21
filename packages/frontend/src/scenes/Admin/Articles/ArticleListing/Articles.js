/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { LevelLeft, Level, LevelItem, LevelRight } from '@boldr/ui/Level';
import ArticleList from './components/ArticleList';
import ArticlePreview from './components/ArticlePreview';

export type Props = {
  articles: Array<Article>,
  article: Article,
  handleDeleteClick: Function,
  handleClick: Function,
};

const SideB = styled.div`
  display: flex;
  flex-basis: 360px;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 100%;

  padding: 0 0.5em;
`;

const Listing = styled.div`
  flex-direction: column;
  padding: 0 2em;
`;
const Container = styled.section`
  display: flex;
  flex-direction: row;
`;

class Articles extends Component {
  props: Props;

  render() {
    return (
      <Container>
        <Helmet title="Admin: Post List" />
        <SideB>
          <Level>
            <LevelLeft>
              <LevelItem>
                <strong>123</strong> posts
              </LevelItem>
            </LevelLeft>
            <LevelRight>
              <LevelItem>
                <strong>All</strong>
              </LevelItem>
              <LevelItem>
                <a>Published</a>
              </LevelItem>
              <LevelItem>
                <a>Draft</a>
              </LevelItem>
              <LevelItem>
                <a>Deleted</a>
              </LevelItem>
            </LevelRight>
          </Level>
          <ArticleList
            articles={this.props.articles}
            handleClick={this.props.handleClick}
            onDeleteClick={this.props.handleDeleteClick}
          />
        </SideB>
        <Listing>
          <ArticlePreview article={this.props.article} />
        </Listing>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    article: state.admin.dashboard.article,
  };
};
export default connect(mapStateToProps)(Articles);
