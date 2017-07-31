/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import ArticleListHead from '../ArticleListHead';
import ArticleListItem from '../ArticleListItem';

export type Props = {
  articles: Array<Article>,
  handleClick: Function,
};

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;
class ArticleList extends Component {
  props: Props;
  render() {
    return (
      <div>
        <ArticleListHead />
        <List>
          {this.props.articles.map(article =>
            <ArticleListItem
              key={article.id}
              article={article}
              handleClick={this.props.handleClick}
            />,
          )}
        </List>
      </div>
    );
  }
}

export default ArticleList;
