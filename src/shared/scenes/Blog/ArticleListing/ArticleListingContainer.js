/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { LAYOUTS } from '../../../core/constants';
import { changeLayout, layoutSelector } from '../../../state/modules/boldr/ui';
import { getArticles, fetchArticlesIfNeeded } from '../state/articles';
import { fetchTagsIfNeeded } from '../state/tags/actions';
import BaseTemplate from '../../../templates/BaseTemplate';
import VisibleArticleListing from './VisibleArticleListing';

type Props = {
  articles: Array<Article>,
  isFetching: boolean,
  listTags: Object,
  layout: string,
  dispatch: Function,
  fetchTagsIfNeeded: () => void,
  changeLayout: () => void,
  handleChangeLayout: () => void,
  fetchArticlesIfNeeded: () => void,
};

export class ArticleListingContainer extends Component {
  static defaultProps: {
    fetchArticlesIfNeeded: () => {},
    fetchTagsIfNeeded: () => {},
  };

  componentDidMount() {
    Promise.all([
      this.props.dispatch(fetchArticlesIfNeeded()),
      this.props.dispatch(fetchTagsIfNeeded()),
    ]);
  }

  props: Props;
  handleChangeLayout = () => {
    this.props.layout === 'grid'
      ? this.props.dispatch(changeLayout(LAYOUTS.LIST))
      : this.props.dispatch(changeLayout(LAYOUTS.GRID));
  };
  render() {
    return (
      <BaseTemplate helmetMeta={<Helmet title="Blog Posts" />}>
        <VisibleArticleListing
          articles={this.props.articles}
          listTags={this.props.listTags}
          layout={this.props.layout}
          handleChangeLayout={this.handleChangeLayout}
          isFetching={this.props.isFetching}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    listTags: state.entities.tags,
    articles: getArticles(state),
    layout: layoutSelector(state),
    isFetching: state.blog.articles.isFetching,
  };
};

export default connect(mapStateToProps)(ArticleListingContainer);
