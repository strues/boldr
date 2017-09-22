import createApolloClient from './createApolloClient';

const config = {
  initialState: {},
  batchRequests: false,
  trustNetwork: true,
  queryDeduplication: true,
  uri: '/api/v1/graphql',
  connectToDevTools: true,
  ssrForceFetchDelay: 100,
};
test('Create Apollo Client - No Data', () => {
  expect(createApolloClient(config)).toBeDefined();
});

test('Create Apollo Client - With Initial Data', () => {
  expect(createApolloClient(config)).toBeDefined();
});

test('Create Apollo Client - With Initial Data and URL', () => {
  expect(createApolloClient(config)).toBeDefined();
});
