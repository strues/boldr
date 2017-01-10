/* @flow */

import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Grid, Col, Row } from '../../../components/Layout';
import { fetchTaggedPost } from '../../../state/modules/blog/tags/actions';
import TagList from './TagList';

type Props = {
  currentTag: Object,
  isFetching: boolean,
  params: Object,
  dispatch: () => void,
};

@provideHooks({
  fetch: ({ dispatch, params: { name } }) => dispatch(fetchTaggedPost(name)),
})
class TagListContainer extends Component {

  componentDidMount() {
    const name = this.props.params.name;
    this.props.dispatch(fetchTaggedPost(name));
  }
  props: Props;
  render() {
    if (this.props.isFetching) {
      return (
        <div>
          Loading
        </div>
      );
    }
    return (
      <TagList { ...this.props.currentTag } />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.blog.tags.isFetching,
    currentTag: state.blog.tags.currentTag,
  };
};

export default connect(mapStateToProps)(TagListContainer);
