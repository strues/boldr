/* eslint-disable react/prefer-stateless-function */
/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import { Col, Row, LevelLeft, Level, LevelItem, LevelRight } from '@boldr/ui';
import type { Dispatch } from '../../../../types/state';
import type { ArticleType, ArticlesType } from '../../../../types/boldr';
import { setArticle } from '../../state/dashboard/actions';
import ArticleList from './components/ArticleList';
import ArticlePreview from './components/ArticlePreview';

export type Props = {
  articles: ArticlesType,
  article: ArticleType,
  handleDeleteClick: Function,
  setArticle: ArticleType => ArticleType,
};

class Articles extends React.Component<Props, *> {
  props: Props;
  handleClick = article => {
    this.props.setArticle(article);
  };

  render() {
    return (
      <Row>
        <Helmet title="Admin: Post List" />
        <Col xs={12} md={4}>
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
            handleClick={this.handleClick}
            onDeleteClick={this.props.handleDeleteClick}
          />
        </Col>
        <Col xs={12} md={8}>
          <ArticlePreview article={this.props.article} />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return {
    article: state.admin.dashboard.article,
  };
};
// $FlowIssue
const connector: Connector<{}, Props> = connect(mapStateToProps, (dispatch: Dispatch) => ({
  setArticle: article => dispatch(setArticle(article)),
}));

export default connector(Articles);
