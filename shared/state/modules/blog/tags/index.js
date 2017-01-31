import tagsReducer, { STATE_KEY } from './tags';
import { getTagIds, getTagsList, getTags } from './selectors';
import { fetchTagsIfNeeded, fetchTags, selectTag, clearTag, createTag } from './actions';

export default tagsReducer;

export { STATE_KEY, fetchTagsIfNeeded, clearTag, fetchTags, selectTag, getTagIds, createTag, getTagsList, getTags };
