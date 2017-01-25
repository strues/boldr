import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CHANGE_LAYOUT, MODAL_OPEN, MODAL_CLOSED } from './constants';
import { changeLayout, showModal, hideModal, openDrawer } from './actions';
import uiReducer from './ui';

describe('UI Duck', () => {
  it('Should return the initial state', () => {
    expect(
        uiReducer(undefined, {}),
      ).toEqual({
        loaded: false,
        layout: 'grid',
        modal: false,
        drawer: false,
        navbar: false,
      });
  });
  it('should open the modal', () => {
    const initialState = {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      navbar: false,
    };
    const stateAfter = {
      loaded: false,
      layout: 'grid',
      modal: true,
      drawer: false,
      navbar: false,
    };
    expect(
      uiReducer(initialState, {
        type: MODAL_OPEN,
      }),
    ).toEqual(stateAfter);
  });
  it('should close the modal', () => {
    const initialState = {
      loaded: false,
      layout: 'grid',
      modal: true,
      drawer: false,
      navbar: false,
    };
    const stateAfter = {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      navbar: false,
    };
    expect(
      uiReducer(initialState, {
        type: MODAL_CLOSED,
      }),
    ).toEqual(stateAfter);
  });
  it('should change the layout', () => {
    const action = {
      type: CHANGE_LAYOUT,
      payload: 'list',
    };
    const state = {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      navbar: false,
    };

    expect(
      uiReducer(state, action),
    ).toEqual({
      loaded: false,
      layout: 'list',
      modal: false,
      drawer: false,
      navbar: false,
    });
  });
});

test('changeLayout', () => {
  const mockStore = configureMockStore([
    thunk,
  ]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      navbar: false,
    },
  });
  store.dispatch(changeLayout('list'));
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/CHANGE_LAYOUT',
    payload: 'list',
  });
});

test('openModal', () => {
  const mockStore = configureMockStore([
    thunk,
  ]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      navbar: false,
    },
  });
  store.dispatch(showModal());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/MODAL_OPEN',
  });
});

test('closeModal', () => {
  const mockStore = configureMockStore([
    thunk,
  ]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      modal: true,
      drawer: false,
      navbar: false,
    },
  });
  store.dispatch(hideModal());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/MODAL_CLOSED',
  });
});

test('Open the drawer', () => {
  const mockStore = configureMockStore([
    thunk,
  ]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      isMobile: false,
      modal: false,
      drawer: false,
      navbar: false,
    },
  });
  store.dispatch(openDrawer());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/OPEN_DRAWER',
  });
});
