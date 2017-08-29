/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import ArticleListHead from '../ArticleListHead';
import ArticleListItem from '../ArticleListItem';
import type { ArticlesType } from '../../../../../../types/boldr';

export type Props = {
  articles: ArticlesType,
  handleClick: Function,
  onDeleteClick: () => void,
};

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

class ArticleList extends React.PureComponent<Props, *> {
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
              onArticleClick={this.props.handleClick}
              onDeleteClick={this.props.onDeleteClick}
            />,
          )}
        </List>
      </div>
    );
  }
}

export default ArticleList;
