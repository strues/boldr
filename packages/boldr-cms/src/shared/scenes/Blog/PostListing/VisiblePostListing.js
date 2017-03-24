import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPublishedPosts, getFeaturedPosts } from '../../../state/modules/blog/posts/reducer';
import PostListing from './PostListing';

const mapStateToProps = (state, { params }) => ({
  features: getFeaturedPosts(state, params.filter || 'featured'),
  posts: getPublishedPosts(state, params.filter || 'published'),
});

const VisiblePostListing = withRouter(connect(mapStateToProps)(PostListing));

export default VisiblePostListing;
