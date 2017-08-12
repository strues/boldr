/* eslint-disable camelcase */
export const CACHE_HASH_TYPE = 'sha256';
export const CACHE_DIGEST_TYPE = 'base62';
export const CACHE_DIGEST_LENGTH = 4;

export const JS_FILES = /\.(js|mjs|jsx)$/;
export const STYLE_FILES = /\.(css|scss|pcss)$/;
export const ASSET_FILES = /\.(eot|woff|woff2|ttf|otf|svg|png|jpg|jpeg|jp2|jpx|jxr|gif|webp|mp4|mp3|ogg|pdf|html|ico)$/;
export const UGLIFY_OPTIONS = {
  compress: {
    unsafe_math: true,
    unsafe_proto: true,
    // good for chrome performance
    keep_infinity: true,
    // try hard to use less code
    passes: 2,
  },
  output: {
    // fix for problematic code like emoticons
    ascii_only: true,
    // more readable output
    semicolons: false,
    comments: false,
  },
};

export const REQUIRED_ENV_VARS = [
  'SERVER_OUTPUT',
  'CLIENT_OUTPUT',
  'PUBLIC_PATH',
  'API_PREFIX',
  'API_URL',
  'GRAPHQL_ENDPOINT',
  'HTML_TEMPLATE',
  'DEV_PORT',
];
