import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { toggleTodo } from '../actions';
import { getPublishedPosts } from '../../../state/modules/blog/posts/posts';
import PostListing from './PostListing';

const mapStateToProps = (state, { params }) => ({
  posts: getPublishedPosts(state, params.filter || 'published'),
});

const VisiblePostListing = withRouter(connect(
  mapStateToProps,
)(PostListing));

export default VisiblePostListing;
