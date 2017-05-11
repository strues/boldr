import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import { normalize, arrayOf, schema } from 'normalizr';
import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
  SELECT_ARTICLE,
} from '../actionTypes';
import postsFixture from './__fixtures__/posts.fixture';
import postFixture from './__fixtures__/post.fixture';
import { fetchArticles, fetchArticle, selectArticle } from './actions';
import { article as articleSchema, arrayOfArticle } from './schema';

const mockStore = configureMockStore([thunk]);

describe('Fetching posts', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('creates FETCH_ARTICLES_SUCCESS when fetching posts', () => {
    moxios.stubRequest('/api/v1/posts?include=[author,tags]', {
      status: 200,
      response: { data: postsFixture },
    });

    const normalizedArticles = normalize(postsFixture, arrayOfArticle);
    const expectedActions = [
      { type: FETCH_ARTICLES_REQUEST },
      {
        type: FETCH_ARTICLES_SUCCESS,
        payload: normalizedArticles,
      },
    ];
    const store = mockStore({
      all: {},
      ids: [],
      currentArticle: {},
      isFetching: false,
    });

    store.dispatch(fetchArticles(axios)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  test('creates FETCH_ARTICLE_SUCCESS when fetching a post is complete', () => {
    moxios.stubRequest('/api/v1/posts/slug/nother-one', {
      status: 200,
      response: { data: postFixture },
    });

    const expectedActions = [
      { type: FETCH_ARTICLE_REQUEST },
      {
        type: FETCH_ARTICLE_SUCCESS,
        payload: postFixture,
      },
    ];
    const store = mockStore({
      all: {},
      ids: [],
      currentArticle: {},
      isFetching: false,
    });
    const slug = 'nother-one';
    store.dispatch(fetchArticle(slug, axios)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  test('Select Post action', () => {
    const post = postFixture;
    const expectedResult = {
      type: SELECT_ARTICLE,
      post,
    };

    expect(selectArticle(post)).toEqual(expectedResult);
  });
});
