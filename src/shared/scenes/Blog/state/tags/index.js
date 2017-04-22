import tagsReducer, { STATE_KEY as TAGS_STATE_KEY } from './reducer';
import { getTagIds, getTagsList, getTags } from './selectors';
import { arrayOfTag, tag } from './schema';

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
  tagsReducer,
  TAGS_STATE_KEY,
  fetchTagsIfNeeded,
  fetchTagPosts,
  fetchTagPostsIfNeeded,
  fetchTags,
  selectTag,
  clearTag,
  createTag,
  deleteTag,
  getTagIds,
  getTagsList,
  getTags,
  arrayOfTag,
  tag,
};
