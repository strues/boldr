import curry from '@boldr/utils/lib/logic/curry';

export const root = () => '/';
export const home = curry((category, sort) => `/${category}/${sort}`);

export const signIn = () => '/login';
export const signUp = () => '/signup';

export const articleDetail = slug => `/blog/${slug}`;
export const postCommentDetail = curry(
  (postId, commentId) => `/post/${postId}/comment/${commentId}`,
);
