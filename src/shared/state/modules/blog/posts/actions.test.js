import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import { normalize, arrayOf, schema } from 'normalizr';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  SELECT_POST,
} from '../../actionTypes';
import postsFixture from './__fixtures__/posts.fixture';
import postFixture from './__fixtures__/post.fixture';
import { fetchPosts, fetchPost, selectPost } from './actions';
import { post as postSchema, arrayOfPost } from './schema';

const mockStore = configureMockStore([thunk]);

describe('Fetching posts', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('creates FETCH_POSTS_SUCCESS when fetching posts', () => {
    moxios.stubRequest('/api/v1/posts?include=[author,tags,comments,comments.commenter,comments.replies]', {
      status: 200,
      response: { data: postsFixture },
    });

    const normalizedPosts = normalize(postsFixture, arrayOfPost);
    const expectedActions = [
      { type: FETCH_POSTS_REQUEST },
      {
        type: FETCH_POSTS_SUCCESS,
        payload: normalizedPosts,
      },
    ];
    const store = mockStore({
      all: {},
      ids: [],
      currentPost: {},
      isFetching: false,
    });

    store.dispatch(fetchPosts(axios)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  test('creates FETCH_POST_SUCCESS when fetching a post is complete', () => {
    moxios.stubRequest('/api/v1/posts/slug/nother-one', {
      status: 200,
      response: { data: postFixture },
    });

    const expectedActions = [
      { type: FETCH_POST_REQUEST },
      {
        type: FETCH_POST_SUCCESS,
        payload: postFixture,
      },
    ];
    const store = mockStore({
      all: {},
      ids: [],
      currentPost: {},
      isFetching: false,
    });
    const slug = 'nother-one';
    store.dispatch(fetchPost(slug, axios)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  test('Select Post action', () => {
    const post = postFixture;
    const expectedResult =
      {
        type: SELECT_POST,
        post,
      };

    expect(selectPost(post)).toEqual(expectedResult);
  });
});
