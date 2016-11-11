import update from 'react/lib/update';
import { merge } from 'lodash';
import deepRemove from 'core/utils/deepRemove';

const SAVE_BLOCK_REQUEST = '@boldr/dashboard/SAVE_BLOCK_REQUEST';
const SAVE_BLOCK_SUCCESS = '@boldr/dashboard/SAVE_BLOCK_SUCCESS';
const SAVE_BLOCK_FAILURE = '@boldr/dashboard/SAVE_BLOCK_FAILURE';
export const CHANGE = 'CHANGE';
export const UPDATE_PROPS = 'UPDATE_PROPS';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REPLACE_STATE = 'REPLACE_STATE';
export const MOVE_ITEM = 'MOVE_ITEM';

export const mergeItems = (state, id) => state.getIn([id, 'props']).children.map(cId => state[cId]);

export const deepMerge = (state, id) => {
  const item = merge({}, state[id]);
  let children = item.props.children;
  if (Array.isArray(children)) {
    children = mergeItems(state, id);
    children = children.map(child => deepMerge(state, child.id));
  }
  item.props.children = children;
  return item;
};

export const generateEmptyLayout = () => {
  return Map({
    root: new ItemRecord({
      type: 'Column',
      id: 'root',
      props: fromJS({
        children: [],
      }),
    }),
  });
};

export const change = (id, items) => ({
  type: CHANGE,
  id,
  items,
});

export const moveItem = (from, to, item) => ({
  type: MOVE_ITEM,
  from,
  to,
  item,
});

export const updateProps = (id, props) => ({
  type: UPDATE_PROPS,
  id,
  props,
});

export const updateLayout = (id, layout) => ({
  type: UPDATE_LAYOUT,
  id,
  layout,
});

export const addItem = (id, index, item) => ({
  type: ADD_ITEM,
  id,
  index,
  item,
});

export const removeItem = (id, parentId, index) => ({
  type: REMOVE_ITEM,
  id,
  parentId,
  index,
});

export const replaceState = state => ({
  type: REPLACE_STATE,
  state,
});
let nextState;
function buildReducer(state = {}, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default buildReducer;
