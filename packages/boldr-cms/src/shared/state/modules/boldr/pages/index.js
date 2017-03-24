import pagesReducer, { STATE_KEY } from './reducer';
import { fetchPagesIfNeeded, fetchPages, fetchPageByUrl } from './actions';
import { getPages } from './selectors';

export default pagesReducer;

export { STATE_KEY, fetchPagesIfNeeded, fetchPages, fetchPageByUrl, getPages };
