/**
 * Selector for quering the nonce which must be used for injecting script tags.
 */
export function getNonce(state) {
  return state.boldr.settings.nonce;
}

const INITIAL_STATE = {
  apolloUri: process.env.GRAPHQL_ENDPOINT || '/api/v1/graphql',
  nonce: '',
};

export default function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case 'SET_CONFIG':
    // return Object.assign({}, state, {
    //   ...action.config,
    // });
    default:
      return state;
  }
}
