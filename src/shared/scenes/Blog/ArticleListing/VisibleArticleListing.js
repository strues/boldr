import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import {
  getPublishedArticles,
  getFeaturedArticles,
} from '../state/articles/reducer';
import ArticleListing from './ArticleListing';

const mapStateToProps = state => ({
  features: getFeaturedArticles(state, 'featured'),
  articles: getPublishedArticles(state, 'published'),
});

const VisibleArticleListing = withRouter(
  connect(mapStateToProps)(ArticleListing),
);

export default VisibleArticleListing;
