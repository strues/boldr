import configureMockStore from 'redux-mock-store';
import Drawer from 'react-md/lib/Drawers';
import thunk from 'redux-thunk';
import { CHANGE_LAYOUT, MODAL_OPEN, MODAL_CLOSED } from '../../actionTypes';
import { changeLayout, showModal, hideModal, openDrawer, closeDrawer } from './actions';
import uiReducer from './reducer';

describe('UI Reducer', () => {
  it('Should return the initial state', () => {
    expect(uiReducer(undefined, {})).toEqual({
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    });
  });
  it('should open the modal', () => {
    const initialState = {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    };
    const stateAfter = {
      loaded: false,
      layout: 'grid',
      modal: true,
      drawer: false,
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
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
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    };
    const stateAfter = {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
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
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    };

    expect(uiReducer(state, action)).toEqual({
      loaded: false,
      layout: 'list',
      modal: false,
      drawer: false,
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    });
  });
});

test('changeLayout', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
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
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      modal: false,
      drawer: false,
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    },
  });
  store.dispatch(showModal());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/MODAL_OPEN',
  });
});

test('closeModal', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      modal: true,
      drawer: false,
      isMobile: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    },
  });
  store.dispatch(hideModal());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/MODAL_CLOSED',
  });
});

test('Open the drawer', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      isMobile: false,
      modal: false,
      drawer: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    },
  });
  store.dispatch(openDrawer());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/OPEN_DRAWER',
  });
});
test('Close the drawer', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    ui: {
      loaded: false,
      layout: 'grid',
      isMobile: false,
      modal: false,
      drawer: false,
      mobile: undefined,
      tablet: undefined,
      desktop: undefined,
      defaultMedia: 'mobile',
    },
  });
  store.dispatch(closeDrawer());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/CLOSE_DRAWER',
  });
});
