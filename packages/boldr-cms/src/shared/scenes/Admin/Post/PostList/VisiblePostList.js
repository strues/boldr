import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { toggleTodo } from '../actions';
import { getPublishedPosts } from '../../../../state/modules/blog/posts/posts';
import PostList from './PostList';

const mapStateToProps = (state, { params }) => ({
  posts: getPublishedPosts(state, params.filter || 'all'),
});

const VisiblePostListing = withRouter(connect(
  mapStateToProps,

)(PostList));

export default VisiblePostListing;
