/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { gql, graphql } from 'react-apollo';
import { Loader } from 'boldr-ui';
import { LAYOUTS } from '../../../core/constants';
import { changeLayout, layoutSelector } from '../../../state/modules/boldr/ui';
import BaseTemplate from '../../../templates/BaseTemplate';
import ArticleListing from './ArticleListing';

type Data = {
  getArticles: Array<Article>,
  loading: boolean,
};
type Props = {
  layout: string,
  dispatch: Function,
  changeLayout: () => void,
  handleChangeLayout: () => void,
  data: Data,
};

export class ArticleListingContainer extends Component {
  props: Props;
  handleChangeLayout = () => {
    this.props.layout === 'grid'
      ? this.props.dispatch(changeLayout(LAYOUTS.LIST))
      : this.props.dispatch(changeLayout(LAYOUTS.GRID));
  };
  render() {
    const { getArticles, loading } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return (
      <BaseTemplate helmetMeta={<Helmet title="Blog Posts" />}>
        {/* $FlowIssue */}
        <ArticleListing
          loading={loading}
          articles={getArticles}
          layout={this.props.layout}
          handleChangeLayout={this.handleChangeLayout}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: layoutSelector(state),
  };
};

const ARTICLES_QUERY = gql`
  query getArticles($offset: Int!, $limit: Int!) {
    getArticles(offset: $offset, limit: $limit) {
      id,
      title,
      slug,
      featureImage
      featured
      published
      createdAt
      excerpt
      tags {
        id,
        name
      },
    }
  }
`;

const ArticleListingContainerWithData = graphql(ARTICLES_QUERY, {
  options: props => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(ArticleListingContainer);
export default connect(mapStateToProps)(ArticleListingContainerWithData);
