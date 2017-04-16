/* @flow */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Col, Row, Loader} from 'boldr-ui';
import Helmet from 'react-helmet';

import BaseTemplate from '../../../templates/BaseTemplate';
import {fetchTagPostsIfNeeded} from '../../../state/modules/blog/tags/actions';
import TagList from './TagList';

type Props = {
  currentTag: Object,
  isFetching: boolean,
  match: Object,
  listTags: Object,
  fetchTagPostsIfNeeded: () => void,
};

export class TagListContainer extends Component {
  static defaultProps: {
    match: {params: {name: ''}},
    fetchTagPostsIfNeeded: () => {},
  };

  componentDidMount() {
    const {fetchTagPostsIfNeeded, match: {params}} = this.props;

    fetchTagPostsIfNeeded(params.name);
  }

  props: Props;
  render() {
    const {match: {params}} = this.props;
    if (this.props.isFetching) {
      return <Loader />;
    }
    return (
      <BaseTemplate
        helmetMeta={<Helmet title={`Posts tagged ${params.name}`} />}
      >
        <TagList
          listTags={this.props.listTags}
          posts={this.props.currentTag.posts}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    tags: state.blog.tags.all,
    isFetching: state.blog.tags.isFetching,
    currentTag: state.blog.tags.currentTag,
  };
};

export default connect(mapStateToProps, {fetchTagPostsIfNeeded})(
  TagListContainer,
);
