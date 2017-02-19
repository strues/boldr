import { selectMenus, selectMainMenu } from './selectors';

test('should select the menu state', () => {
  const menuState = {};
  const mockedState = {
    boldr: {
      menu: menuState,
    },
  };
  expect(selectMenus(mockedState)).toEqual(menuState);
});
