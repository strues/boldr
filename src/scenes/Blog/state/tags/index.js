import tagsReducer from './reducer';
import { getTagIds, getTagsList, getTags } from './selectors';

import { selectTag, clearTag, createTag, deleteTag } from './actions';

export default tagsReducer;

export { tagsReducer, selectTag, clearTag, createTag, deleteTag, getTagIds, getTagsList, getTags };
