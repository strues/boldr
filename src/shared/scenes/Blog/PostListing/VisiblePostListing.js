import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import {
  getPublishedPosts,
  getFeaturedPosts,
} from '../../../state/modules/blog/posts/reducer';
import PostListing from './PostListing';

const mapStateToProps = state => ({
  features: getFeaturedPosts(state, 'featured'),
  posts: getPublishedPosts(state, 'published'),
});

const VisiblePostListing = withRouter(connect(mapStateToProps)(PostListing));

export default VisiblePostListing;
