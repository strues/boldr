import curry from '@boldr/utils/lib/logic/curry';

export const root = () => '/';
export const home = curry((category, sort) => `/${category}/${sort}`);
export const homeRoute = () => '/';
export const aboutRoute = () => '/about';
export const adminRoute = () => '/admin';
export const profileRoute = username => `/profiles/${username}`;
export const blogRoute = () => '/blog';
export const articleRoute = slug => `/blog/${slug}`;
export const tagRoute = name => `/blog/tags/${name}`;
export const loginRoute = () => '/login';
export const signupRoute = () => '/signup';
