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
  postId: String,
  isAuthenticated: Boolean,
  roleId: Number,
};

class PostComments extends PureComponent {
  state = { collapsed: true };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  props: Props;
  render() {
    const { comments } = this.props;
    const canModerate = this.props.roleId === 3;
    return (
      <div className="boldr-comments">
        { this.props.comments.length } comments
      {
        this.props.isAuthenticated
        ? <Button raised secondary onClick={ this.toggleCollapse } style={ { marginBottom: 16 } }>comment</Button>
        : null
      }
        <Collapse collapsed={ this.state.collapsed }>
         <AddComment postId={ this.props.postId } />
        </Collapse>
        {
          this.props.comments.map(comment => {
            const commenter = this.props.userEntities[comment.comment_author_id];
            return (
              <Comment
                key={ comment.id }
                commenter={ commenter }
                canModerate={ canModerate }
                comment={ comment }
              />);
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    roleId: state.users.me.roleId,
  };
};

export default connect(mapStateToProps)(PostComments);
