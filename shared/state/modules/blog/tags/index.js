import tagsReducer, { STATE_KEY } from './tags';
import { getTagIds, getTagsList, getTags } from './selectors';
import { fetchTagsIfNeeded, fetchTags, selectTag, clearTag } from './actions';

export default tagsReducer;

export { STATE_KEY, fetchTagsIfNeeded, clearTag, fetchTags, selectTag, getTagIds, getTagsList, getTags };
