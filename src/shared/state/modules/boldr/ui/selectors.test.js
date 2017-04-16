import {selectUi, makeSelectUi, makeSelectMobile} from './selectors';

test('should select the ui state', () => {
  const uiState = {};
  const mockedState = {
    boldr: {
      ui: uiState,
    },
  };
  expect(selectUi(mockedState)).toEqual(uiState);
});

describe('makeSelectUi', () => {
  const uiSelector = makeSelectUi();
  it('should select the ui', () => {
    const actualState = {};
    const mockedState = {
      boldr: {
        ui: {},
      },
    };
    expect(uiSelector(mockedState)).toEqual(actualState);
  });
});

describe('makeSelectMobile', () => {
  const uiSelector = makeSelectMobile();
  it('should select the ui.ismobile', () => {
    const isMobile = false;
    const mockedState = {
      boldr: {
        ui: {
          isMobile,
        },
      },
    };
    expect(uiSelector(mockedState)).toEqual(isMobile);
  });
});
