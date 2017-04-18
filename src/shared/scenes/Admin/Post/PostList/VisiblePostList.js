import {connect} from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import {getPublishedPosts} from '../../../../state/modules/blog/posts/reducer';
import PostList from './PostList';

const mapStateToProps = state => ({
  posts: getPublishedPosts(state, 'all'),
});

const VisiblePostListing = withRouter(connect(mapStateToProps)(PostList));

export default VisiblePostListing;
