import { createSelector } from 'reselect';
import merge from 'lodash/merge';
import { getPosts } from './posts/selectors';
import { getTags } from './tags/selectors';

export const getPostTags = createSelector(
  [getPosts, getTags],
          (posts, tags) => {
            if (tags) {
              return merge({}, tags, posts[tags.id]);
            }
          }
);
