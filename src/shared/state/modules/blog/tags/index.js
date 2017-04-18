import tagsReducer, {STATE_KEY} from './reducer';
import {getTagIds, getTagsList, getTags} from './selectors';
import {
  fetchTagsIfNeeded,
  fetchTagPosts,
  fetchTagPostsIfNeeded,
  fetchTags,
  selectTag,
  clearTag,
  createTag,
  deleteTag,
} from './actions';

export default tagsReducer;

export {
  STATE_KEY,
  fetchTagsIfNeeded,
  clearTag,
  fetchTags,
  selectTag,
  getTagIds,
  createTag,
  getTagsList,
  getTags,
  deleteTag,
  fetchTagPosts,
  fetchTagPostsIfNeeded,
};
