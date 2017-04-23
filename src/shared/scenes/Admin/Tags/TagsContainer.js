/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTagsIfNeeded, getTags } from '../../Blog/state';
import Tags from './Tags';

type Props = {
  tags: Array<Tag>,
  currentTag: Object,
  dispatch: Function,
  fetchTagsIfNeeded: Function,
};

class TagsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTagsIfNeeded());
  }
  props: Props;

  render() {
    return <Tags tags={this.props.tags} currentTag={this.props.currentTag} />;
  }
}

const mapStateToProps = state => {
  return {
    tags: getTags(state),
    currentTag: state.blog.tags.currentTag,
  };
};
export default connect(mapStateToProps)(TagsContainer);
