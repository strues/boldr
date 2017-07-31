import { css } from 'styled-components';
import { convertToCssPosition, convertToCssDuration, getPosition, getDuration } from './utils';

jest.mock('styled-components');

describe('utils', () => {
  describe('convertToCssPosition', () => {
    it('should properly convert given position', () => {
      const testPosition = ['auto', 'auto', '30px', '30px'];
      const expected = ['top: auto;', 'right: auto;', 'bottom: 30px;', 'left: 30px;'];
      expect(convertToCssPosition(testPosition)).toEqual(expected);
    });
  });

  describe('convertToCssDuration', () => {
    it('should properly convert given miliseconds', () => {
      const testDuration = 300;
      const expected = '0.3s';
      expect(convertToCssDuration(testDuration)).toEqual(expected);
    });
  });

  describe('getPosition and getDuration', () => {
    const position = getPosition;
    const duration = getDuration;
    expect(css.mock.calls.length).toEqual(2);
  });
});
