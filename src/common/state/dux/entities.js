import merge from 'lodash/merge';

const initialState = {
  posts: {},
  tags: {},
  attachments: {},
  users: {},
  pages: {},
  navigations: {},
  links: {},
  settings: {},
};

export default function entitiesReducer(state = initialState, action) {
  if (action.result && action.result.entities) {
    return merge({}, state, action.result.entities);
  }
  return state;
}
