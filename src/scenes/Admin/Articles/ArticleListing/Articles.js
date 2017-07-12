/* @flow */
import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { format } from 'date-fns';

// internal
import Paper from '@boldr/ui/Paper';
import Icon from '@boldr/ui/Icons/Icon';
import Avatar from '@boldr/ui/Avatar';
import Headline from '@boldr/ui/Headline';
import Loader from '@boldr/ui/Loader';

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
`;

const Listing = styled.div`flex-direction: column;`;
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
          <ArticleList articles={this.props.articles} handleClick={this.props.handleClick} />
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
