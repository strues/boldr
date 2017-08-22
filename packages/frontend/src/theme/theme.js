/* eslint-disable new-cap */
import Color from 'color';

import { css } from 'styled-components';
import { em } from 'polished';
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
  palette: {
    primary1: Color('#0094c6').hsl().string(),
    primary2: Color('#3178B7').hsl().string(),
    primary3: Color('#1B252F').hsl().string(),
    primary4: Color('#243140').hsl().string(),
    primary5: Color('#2D3E50').hsl().string(),
    primary6: Color('#4F6A92').hsl().string(),
    primaryAccent: Color('#00bcd4').hsl().string(),
    success: Color('#61e786').hsl().string(),
    danger: Color('#ef476f').hsl().string(),
    warning: Color('#fffd82').hsl().string(),
    info: Color('#6320EE').hsl().string(),
    neutral1: Color('#ECF0F0').hsl().string(),
    neutral2: Color('#F7F7F9').hsl().string(),
    neutral3: Color('#DEE0E3').hsl().string(),
    neutral4: Color('#9198A0').hsl().string(),
    gunmetal: Color('#202b39').hsl().string(),
    nearBlack: Color('#030507').hsl().string(),
  },
  fontColor: {
    light: Color('#F7F7F9').hsl().string(),
    dark: Color('#030507').hsl().string(),
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
