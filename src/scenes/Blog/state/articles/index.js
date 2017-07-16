import articlesReducer, { getPublishedArticles, getFeaturedArticles } from './reducer';
import { togglePostLayoutView } from './actions';

export default articlesReducer;

export { articlesReducer, togglePostLayoutView, getPublishedArticles, getFeaturedArticles };
