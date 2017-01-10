import tagsReducer, { STATE_KEY } from './tags';

import { fetchTagsIfNeeded, fetchTags, selectTag } from './actions';

export default tagsReducer;

export { STATE_KEY, fetchTagsIfNeeded, fetchTags, selectTag };
