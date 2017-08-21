import { css } from 'styled-components';
import { em } from 'polished';
import { GRID_SETTINGS } from '../components/Layout/constants';

const SIZES = {
  large: 75,
  medium: 62,
  small: 48,
};
export const fontSize = {
  '-2': 10,
  '-1': 12,
  0: 13,
  1: 15,
  2: 18,
  3: 24,
  4: 34,
  5: 45,
  6: 56,
  7: 112,
};

export const fontFamily = {
  primary: 'Roboto, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif',
  header: 'Chivo, Cambria, Times New Roman, Times, serif',
  monospace: 'Consolas, Liberation Mono, Courier, monospace',
};

export const fontWeight = {
  light: '200',
  regular: '300',
  bold: '600',
};

export const mediaQuery = Object.keys(SIZES).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = SIZES[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

export default {
  boldrgrid: GRID_SETTINGS,
  colors: {
    blue: '#00bcd4',
  },
  fontFamily: { ...fontFamily },

  fontWeight: { ...fontWeight },

  fontSize: { ...fontSize },
  borders: {
    thin: '1px',
    medium: '2px',
    thick: '3px',
    radius: '3px',
  },
  input: {
    padding: '18px',
    fontSize: '16px',
    borderRadius: '3px',
    width: '100%',
    border: 'solid 1px #babbbb',
    margin: '0 auto 1rem',
    activeBorderColor: '#484848',
  },
  inputWrapper: {
    marginBottom: '1rem',
  },
};
