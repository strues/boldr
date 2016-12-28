import { createSelector } from 'reselect';


/**
  * POSTS SELECTORS
  *
  *****************************************************************/
export const getPosts = state => state.blog.posts.list;
// export const getPosts = createSelector(
//   [
//     (state) => state.posts.list,
//     (state) => state.posts.bySlug,
//   ],
//   (list, bySlug) => list.map(l => bySlug[l]),
// );
export const getTagEntities = state => state.entities.tags;

// export const getPosts = (state: Object) => state.posts.list;
