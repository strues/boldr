import curry from '@boldr/utils/lib/logic/curry';

export const root = () => '/';
export const home = curry((category, sort) => `/${category}/${sort}`);

export const signIn = () => '/login';
export const signUp = () => '/signup';

export const postDetail = postId => `/post/${postId}`;
export const postCommentDetail = curry(
  (postId, commentId) => `/post/${postId}/comment/${commentId}`,
);
