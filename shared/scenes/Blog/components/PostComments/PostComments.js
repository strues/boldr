/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons';
import Collapse from 'react-md/lib/Helpers/Collapse';
import AddComment from '../AddComment';
import Comment from '../Comment';

type Props = {
  userEntities: Object,
  comments: Array<Object>,
};

class PostComments extends PureComponent {
  state = { collapsed: true };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  props: Props;
  render() {
    const { comments } = this.props;
    return (
      <div className="boldr-comments">
        PostComments
        <Button floating fixed secondary onClick={ this.toggleCollapse } style={{ marginBottom: 16 }}>comment</Button>
        <Collapse collapsed={this.state.collapsed}>
         <AddComment />
        </Collapse>
        {
          this.props.comments.map(comment => {
            const commenter = this.props.userEntities[comment.comment_author_id];
            return (
              <Comment key={ comment.id } commenter={ commenter } comment={ comment } />);
          })
        }
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
