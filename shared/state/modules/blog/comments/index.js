import commentsReducer, { STATE_KEY } from './reducer';
import {
  getCommentIds,
  getCommentsList,
  selectComments,
} from './selectors';

export default commentsReducer;

export {
  STATE_KEY,
  getCommentIds,
  getCommentsList,
  selectComments,
};
