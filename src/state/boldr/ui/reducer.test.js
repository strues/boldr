import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as t from '../actionTypes';
import { changeLayout, showModal, hideModal, toggleDrawer } from './actions';
import uiReducer from './reducer';

describe('UI Reducer', () => {
  it('Should return the initial state', () => {
    expect(uiReducer(undefined, {})).toEqual({
      layout: 'grid',
      modal: false,
      expanded: true,
      visible: true,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
    });
  });
  it('should open the modal', () => {
    const initialState = {
      layout: 'grid',
      modal: false,
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
    };
    const stateAfter = {
      layout: 'grid',
      modal: true,
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
    };
    expect(
      uiReducer(initialState, {
        type: t.MODAL_OPEN,
      }),
    ).toEqual(stateAfter);
  });
  it('should close the modal', () => {
    const initialState = {
      layout: 'grid',
      modal: true,
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
    };
    const stateAfter = {
      layout: 'grid',
      modal: false,
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
    };
    expect(
      uiReducer(initialState, {
        type: t.MODAL_CLOSED,
      }),
    ).toEqual(stateAfter);
  });
  it('should change the layout', () => {
    const action = {
      type: t.CHANGE_LAYOUT,
      payload: 'list',
    };
    const state = {
      layout: 'grid',
      modal: false,
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
    };

    expect(uiReducer(state, action)).toEqual({
      layout: 'list',
      modal: false,
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
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
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
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
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
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
      layout: 'grid',
      modal: true,
      expanded: false,
      isMobile: false,
      showSidebar: true,
      showHeader: true,
    },
  });
  store.dispatch(hideModal());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/MODAL_CLOSED',
  });
});
