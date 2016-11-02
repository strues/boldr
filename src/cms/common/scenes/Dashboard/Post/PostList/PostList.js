/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Item, Segment, Icon, Menu } from 'semantic-ui-react';
import { fetchPostsIfNeeded, getPosts, deletePost } from '../../../../state/dux/post';
import { PostListItem } from '../components';
import type { Post } from '../../../../types/models';

export type Props = {
  children?: ReactElement,
  posts: Array<Post>,
  dispatch?: () => void,
  deletePost: () => void,
  fetchPostsIfNeeded: () => void,
  current?: Object
};
@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(fetchPostsIfNeeded()));
    return Promise.all(promises);
  }
}])
class PostList extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).handleArticleClick = this.handleArticleClick.bind(this);
    (this: any).handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchPostsIfNeeded();
  }
  props: Props;
  // postId is a uuid, not an integer
  handleArticleClick(postId: string): void {

  }
  handleDeleteClick(postId: string): void {
    this.props.deletePost(postId);
  }
  render() {
    return (
      <div>
      <Menu attached="top">
          <Menu.Menu position="right">
            <div className="ui right aligned category search item">
              <Icon name="grid layout" />
            </div>
          </Menu.Menu>
        </Menu>
       <Segment>
       <Item.Group>
        {
          this.props.posts.map((post, index) => (
           <PostListItem
             article={ post }
             created_at={ post.created_at }
             key={ post.slug }
             sortRank={ index }
             content={ post.content }
             title={ post.title }
             slug={ post.slug }
             handleDeleteClick={ this.handleDeleteClick }
             handleArticleClick={ this.handleArticleClick }
           />
         ))
        }
        </Item.Group>
      </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
    isLoading: state.posts.isLoading
  };
};
export default connect(mapStateToProps, { fetchPostsIfNeeded, deletePost })(PostList);
