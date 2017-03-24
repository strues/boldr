import createClientMiddleware from './clientMiddleware';

const client = {};
const clientMiddleware = createClientMiddleware(client);

const createFakeStore = fakeData => ({
  getState() {
    return fakeData;
  },
});

const dispatchWithStore = (storeData, action, dispatched) => {
  const store = createFakeStore(storeData);
  clientMiddleware(store)(actionAttempt => dispatched.push(actionAttempt))(action);
};

describe('+++ Client Middleware', () => {
  let promise, resolePromise, rejectPromise;
  const action = {
    types: ['CREATE_REQUEST', 'CREATE_SUCCESS', 'CREATE_FAILURE'],
    promise: apiClient => apiClient.get('/create'),
  };

  beforeEach(() => {
    promise = new Promise((resolve, reject) => {
      resolePromise = resolve;
      rejectPromise = reject;
    });
    client.get = () => promise;
  });

  it('should dispatch action started and action fail if the promise is rejected', done => {
    const dispatched = [];
    dispatchWithStore({}, action, dispatched);
    expect(dispatched).toEqual([{ type: 'CREATE_REQUEST' }]);
    rejectPromise('error');
    promise.catch(() => {
      expect(dispatched).toEqual([{ type: 'CREATE_REQUEST' }, { error: 'error',
        type: 'CREATE_FAILURE' }]);
      done();
    });
  });
});
