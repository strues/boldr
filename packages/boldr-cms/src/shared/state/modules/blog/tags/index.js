import tagsReducer, { STATE_KEY } from './tags';
import { getTagIds, getTagsList, getTags } from './selectors';
import { fetchTagsIfNeeded, fetchTags, selectTag } from './actions';

export default tagsReducer;

export { STATE_KEY, fetchTagsIfNeeded, fetchTags, selectTag, getTagIds, getTagsList, getTags };
