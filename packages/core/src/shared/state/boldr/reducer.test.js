import boldrReducer from './reducer';

describe('Boldr Reducer', () => {
  it('Should return the initial state', () => {
    expect(boldrReducer(undefined, {})).toEqual({
      settings: {
        nonce: '',
        apolloUri: '/api/v1/graphql',
      },
      ui: {
        layout: 'grid',
        isExpanded: false,
        isMobile: false,
        isDrawerOpen: false,
        isModalVisible: false,
      },
      notifications: [],
    });
  });
});
