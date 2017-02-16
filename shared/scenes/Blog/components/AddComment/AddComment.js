/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { newComment } from '../../../../state/modules/blog/comments/actions';
import CommentForm from './CommentForm';

type Props = {
  dispatch: Function,
  postId: String,
  data: Object,
};

@connect()
class AddComment extends PureComponent {

  handleCommentSubmit = (values) => {
    const data = {
      content: draftToHtml(values.content),
      raw_content: values.content || null,
    };
    const { postId } = this.props;
    this.props.dispatch(newComment(data, postId));
  }

  props: Props;

  render() {
    return (
        <CommentForm onSubmit={ this.handleCommentSubmit } />
    );
  }
}

export default AddComment;
