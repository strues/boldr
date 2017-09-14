/**
 * Selector for quering the nonce which must be used for injecting script tags.
 */
export function getNonce(state) {
  return state.boldr.settings.nonce;
}

const initial = {
  apolloUri: process.env.GRAPHQL_ENDPOINT || '/api/v1/graphql',
  nonce: '',
};
// eslint-disable-next-line
export default function settingsReducer(state = initial, action) {
  return state;
}
