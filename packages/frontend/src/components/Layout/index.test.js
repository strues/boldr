/* eslint-disable no-unused-expressions */
import { GRID_SETTINGS, Grid, Row, Col } from '.';

describe('index', () => {
  it('should correctly exports', () => {
    expect(GRID_SETTINGS).toBeOk();
    expect(Grid).toBeOk();
    expect(Row).toBeOk();
    expect(Col).toBeOk();
  });
});
