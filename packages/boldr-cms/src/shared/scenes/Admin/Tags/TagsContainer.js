/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { fetchTagsIfNeeded, getTags } from '../../../state/modules/blog/tags';
import type { Tag } from '../../../types/models';
import Tags from './Tags';

export type Props = {
  tags: Array<Tag>,
  fetchTagsIfNeeded: Function
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchTemplates());
  },
})
export class TagsContainer extends Component {
  componentDidMount() {
    this.props.fetchTagsIfNeeded();
  }
  props: Props;
  render() {
    return (
      <Tags tags={ this.props.tags } />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    tags: getTags(state),
  };
};
export default connect(mapStateToProps, { fetchTagsIfNeeded })(TagsContainer);
