/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import Collapse from 'react-md/lib/Helpers/Collapse';
import styled from 'styled-components';
import AddComment from '../AddComment';
import Comment from '../Comment';
import { Heading } from '../../../../components';

type Props = {
  userEntities: Object,
  comments: Array<Object>,
  postId: String,
  isAuthenticated: Boolean,
  roleId: Number,
};
const CommentListHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const CommentList = styled.ul`
  list-style-type: none;
  margin: 20px 0;
  padding-left: 0;
`;
const CommentItem = styled.li`
  padding-left: 0;
`;
class PostComments extends Component {
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
        <CommentListHeader>
        <Heading size={ 2 } fweight={ 200 }>
          <FontIcon>comment</FontIcon> { comments.length } Comments
        </Heading>
      {
        this.props.isAuthenticated
        ?
        <Button
          raised
          secondary
          onClick={ this.toggleCollapse }
          style={ {
            marginBottom: 16,
            marginLeft: 15,
          } }
          label="Add Comment"
        >
        add
        </Button>
        : null
      }
    </CommentListHeader>
        <Collapse collapsed={ this.state.collapsed }>
         <AddComment postId={ this.props.postId } />
        </Collapse>
        <CommentList>
        {
          this.props.comments.map(comment => {
            const commenter = this.props.userEntities[comment.comment_author_id];
            return (
              <CommentItem key={ comment.id }>
              <Comment
                commenter={ commenter }
                canModerate={ canModerate }
                isAuthenticated={ this.props.isAuthenticated }
                comment={ comment }
              />
            </CommentItem>);
          })
        }
        </CommentList>
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
