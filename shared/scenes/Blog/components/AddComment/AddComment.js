/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { newComment } from '../../../../state/modules/blog/comments/actions';
import CommentForm from './CommentForm';

type Props = {
  dispatch: Function,
  postId: String,
  data: Object,
};

@connect()
class AddComment extends PureComponent {

  handleCommentSubmit = (data, postId) => {
    this.props.dispatch(newComment(data, postId));
  }

  props: Props;

  render() {
    return (
      <div>
        AddComment
        <CommentForm onSubmit={ this.handleCommentSubmit } />
      </div>
    );
  }
}

export default AddComment;
