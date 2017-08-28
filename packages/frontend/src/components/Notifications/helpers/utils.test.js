import { css } from 'styled-components';
import 'jest-styled-components';
import { convertToCssPosition, convertToCssDuration, getPosition, getDuration } from './utils';

describe('utils', () => {
  describe('convertToCssPosition', () => {
    it('should properly convert given position', () => {
      const testPosition = ['auto', 'auto', '30px', '30px'];
      const expected = ['top: auto;', 'right: auto;', 'bottom: 30px;', 'left: 30px;'];
      expect(convertToCssPosition(testPosition)).toEqual(expected);
    });
  });
});
