import pagesReducer from './pages';
import { getPages, getPageByLabel } from './selectors';
import { fetchPagesIfNeeded, fetchPages, fetchPageByUrl } from './actions';

export default pagesReducer;

export {
  getPages,
  getPageByLabel,
  fetchPagesIfNeeded,
  fetchPages,
  fetchPageByUrl,
};
