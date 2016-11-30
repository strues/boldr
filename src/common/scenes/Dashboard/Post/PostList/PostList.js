/* @flow */
import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
<<<<<<< HEAD:src/common/scenes/Dashboard/Post/PostList/PostList.js
import { Item, Segment, Menu } from 'semantic-ui-react';
=======
import { Item, Segment } from 'semantic-ui-react';
>>>>>>> develop:src/common/scenes/Dashboard/Post/PostList/PostList.js
import { Icon } from 'components/index';
import { fetchPostsIfNeeded, getPosts, deletePost } from '../../../../state/dux/post';
import { PostListItem } from '../components';
import type { Post } from 'types/models';

export type Props = {
  children?: ReactElement,
  posts: Array<Post>,
  dispatch?: () => void,
  deletePost: () => void,
  fetchPostsIfNeeded: () => void,
  current?: Object
};

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
<<<<<<< HEAD:src/common/scenes/Dashboard/Post/PostList/PostList.js
      <Menu attached="top">
          <Menu.Menu position="right">
            <div className="ui right aligned category search item">
              <Icon kind="list-view" />
            </div>
          </Menu.Menu>
        </Menu>
=======
>>>>>>> develop:src/common/scenes/Dashboard/Post/PostList/PostList.js
       <Segment>
       <Item.Group>
        {
          this.props.posts.map(post => (
           <PostListItem
             key={ post.slug }
             id={ post.id }
             slug={ post.slug }
             excerpt={ post.excerpt }
             content={ post.content }
             feature_image={ post.feature_image }
             title={ post.title }
             status={ post.status }
             created_at={ post.created_at }
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
    loading: state.posts.loading,
  };
};
const asyncProps = [{
  promise: ({ store: { dispatch, getState } }) => dispatch(fetchPostsIfNeeded()),
}];

export default asyncConnect(asyncProps, mapStateToProps, { fetchPostsIfNeeded, deletePost })(PostList);
