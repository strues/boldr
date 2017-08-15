import boldrReducer from './reducer';

describe('Boldr Reducer', () => {
  it('Should return the initial state', () => {
    expect(boldrReducer(undefined, {})).toEqual({
      settings: {
        apolloUri: '/api/v1/graphql',
      },
      ui: {
        isExpanded: true,
        isMobile: false,
        layout: 'grid',
        showHeader: true,
        isSmall: false,
        modal: false,
      },
      notifications: [],
    });
  });
});
