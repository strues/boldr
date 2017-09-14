import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as t from '../actionTypes';
import { changeLayout, toggleModal, toggleCollapse, toggleDrawer } from './actions';
import uiReducer from './reducer';

describe('UI Reducer', () => {
  it('Should return the initial state', () => {
    expect(uiReducer(undefined, {})).toEqual({
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    });
  });
  it('should open the modal', () => {
    const initialState = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };
    const stateAfter = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: true,
    };
    expect(
      uiReducer(initialState, {
        type: t.TOGGLE_MODAL,
      }),
    ).toEqual(stateAfter);
  });
  it('should close the modal', () => {
    const initialState = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: true,
    };
    const stateAfter = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };
    expect(
      uiReducer(initialState, {
        type: t.TOGGLE_MODAL,
      }),
    ).toEqual(stateAfter);
  });
  it('should change the layout', () => {
    const action = {
      type: t.CHANGE_LAYOUT,
      layout: 'list',
    };
    const state = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };

    expect(uiReducer(state, action)).toEqual({
      layout: 'list',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    });
  });
  it('should open the drawer', () => {
    const initialState = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };
    const stateAfter = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: true,
      isModalVisible: false,
    };
    expect(
      uiReducer(initialState, {
        type: t.TOGGLE_DRAWER,
      }),
    ).toEqual(stateAfter);
  });
  it('should close the drawer', () => {
    const initialState = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: true,
      isModalVisible: false,
    };
    const stateAfter = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };
    expect(
      uiReducer(initialState, {
        type: t.TOGGLE_DRAWER,
      }),
    ).toEqual(stateAfter);
  });
  it('should expand the element', () => {
    const initialState = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };
    const stateAfter = {
      layout: 'grid',
      isExpanded: true,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };
    expect(
      uiReducer(initialState, {
        type: t.TOGGLE_COLLAPSE,
      }),
    ).toEqual(stateAfter);
  });
  it('should collapse', () => {
    const initialState = {
      layout: 'grid',
      isExpanded: true,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };
    const stateAfter = {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    };
    expect(
      uiReducer(initialState, {
        type: t.TOGGLE_COLLAPSE,
      }),
    ).toEqual(stateAfter);
  });
});

test('changeLayout', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    ui: {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    },
  });
  store.dispatch(changeLayout('list'));
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/CHANGE_LAYOUT',
    layout: 'list',
  });
});

test('openModal', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    ui: {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: false,
    },
  });
  store.dispatch(toggleModal());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/TOGGLE_MODAL',
  });
});

test('closeModal', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    ui: {
      layout: 'grid',
      isExpanded: false,
      isMobile: false,
      isDrawerOpen: false,
      isModalVisible: true,
    },
  });
  store.dispatch(toggleModal());
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: '@boldr/ui/TOGGLE_MODAL',
  });
});
