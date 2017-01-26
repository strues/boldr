import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as t from './constants';
import data from './fixture.json';
import { fetchPosts } from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('post action creators', () => {
  test('Should return the initial state', () => {
    const expectedActions = [
      { type: t.FETCH_POSTS_REQUEST },
    ];
    const store = mockStore({ blog: { posts: { all: {}, ids: [] } } });
    return store.dispatch(fetchPosts())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
