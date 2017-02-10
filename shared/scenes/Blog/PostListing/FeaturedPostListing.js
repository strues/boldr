import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getFeaturedPosts } from '../../../state/modules/blog/posts/posts';
import FeaturedPost from './FeaturedPost';

const mapStateToProps = (state, { params }) => ({
  posts: getFeaturedPosts(state, params.filter || 'featured'),
});

const FeaturedPostListing = withRouter(connect(
  mapStateToProps,
)(FeaturedPost));

export default FeaturedPostListing;
