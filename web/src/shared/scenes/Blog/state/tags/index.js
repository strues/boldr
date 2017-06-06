import tagsReducer from './reducer';
import { getTagIds, getTagsList, getTags } from './selectors';
import { arrayOfTag, tag } from './schema';

import {
  fetchTagsIfNeeded,
  fetchTagPosts,
  fetchTagArticlesIfNeeded,
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
  fetchTagArticlesIfNeeded,
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
