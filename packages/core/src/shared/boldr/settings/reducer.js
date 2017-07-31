const initial = {
  apolloUri: process.env.GRAPHQL_ENDPOINT || '/api/v1/graphql',
};
// eslint-disable-next-line
export default function settingsReducer(state = initial, action) {
  return state;
}
