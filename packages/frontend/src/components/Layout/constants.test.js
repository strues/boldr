import { GRID_SETTINGS, BREAKPOINT_NAMES } from './constants';

describe('GRID_SETTINGS', () => {
  it('should be an object', () => {
    const output = {
      breakpoints: { lg: 75, md: 64, sm: 48, xs: 0 },
      container: { lg: 76, md: 61, sm: 46 },
      gridSize: 12,
      gutterWidth: 1,
      outerMargin: 2,
    };
    expect(GRID_SETTINGS).toEqual(output);
  });
});
describe('DIMENSION_NAMES', () => {
  it('should be an array', () => {
    const output = ['xs', 'sm', 'md', 'lg'];
    expect(BREAKPOINT_NAMES).toEqual(output);
  });
});
