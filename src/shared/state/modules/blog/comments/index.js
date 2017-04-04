import commentsReducer, { STATE_KEY } from './reducer';
import { getCommentIds, getCommentsList, selectComments } from './selectors';

import { newComment } from './actions';

export default commentsReducer;

export { STATE_KEY, newComment, getCommentIds, getCommentsList, selectComments };
