import { keyframes } from 'styled-components';
import { horizontalShow, horizontalHide, verticalShow, verticalHide } from './animations';

jest.mock('styled-components');

describe('horizontalShow, horizontalHide, verticalShow, verticalHide', () => {
  const animations = [horizontalShow, horizontalHide, verticalShow, verticalHide];
  animations.forEach(animation => {
    it("it should call styled-components' keyframes method", () => {
      animation({});
      expect(keyframes).toBeCalled();
    });
  });
});
