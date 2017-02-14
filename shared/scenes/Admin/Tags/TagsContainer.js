/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTagsIfNeeded, getTags } from '../../../state/modules/blog/tags';
import type { Tag } from '../../../types/models';
import Tags from './Tags';

type Props = {
  tags: Array<Tag>,
  currentTag: Object,
  dispatch: Function,
  fetchTagsIfNeeded: Function,
};


class TagsContainer extends Component {
  static fetchData(dispatch) {
    return Promise.all([
      dispatch(fetchTagsIfNeeded()),
    ]);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    TagsContainer.fetchData(dispatch);
  }
  props: Props;

  render() {
    return (
      <Tags tags={ this.props.tags } currentTag={ this.props.currentTag } />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: getTags(state),
    currentTag: state.blog.tags.currentTag,
  };
};
export default connect(mapStateToProps)(TagsContainer);
