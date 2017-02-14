/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddComment from '../AddComment';
import Comment from '../Comment';

type Props = {
  userEntities: Object,
  comments: Array<Object>,
};

class PostComments extends Component {
  props: Props;
  render() {
    const { comments } = this.props;
    return (
      <div className="boldr-comments">
        PostComments
        {
          this.props.comments.map(comment => {
            const commenter = this.props.userEntities[comment.comment_author_id];
            return (
              <Comment key={ comment.id } commenter={ commenter } comment={ comment } />);
          })
        }
        <AddComment />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    c: state.blog.comments,
  };
};

export default connect(mapStateToProps)(PostComments);
