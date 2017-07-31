import createApolloClient from './createApolloClient';

test('Create Apollo Client - No Data', () => {
  expect(createApolloClient()).toBeDefined();
});

test('Create Apollo Client - With Initial Data', () => {
  expect(createApolloClient({ initialData: {} })).toBeDefined();
});

test('Create Apollo Client - With Initial Data and URL', () => {
  expect(
    createApolloClient({ initialData: { boldr: { apolloUri: 'http://my.apollo.uri' } } }),
  ).toBeDefined();
});
