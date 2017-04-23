import tagsReducer from './reducer';
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
