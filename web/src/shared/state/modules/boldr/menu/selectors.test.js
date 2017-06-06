import { selectMenus, selectMainMenu } from './selectors';

test('should select the menu state', () => {
  const menuState = {};
  const mockedState = {
    boldr: {
      menus: menuState,
    },
  };
  expect(selectMenus(mockedState)).toEqual(menuState);
});
