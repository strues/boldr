/* eslint-disable new-cap */
import Color from 'color';

import { css } from 'styled-components';

const SIZES = {
  large: 75,
  medium: 62,
  small: 48,
};

export const spacer = 1;
export const spacers = {
  s0: 0,
  s1: `${spacer * 0.25}rem`,
  s2: `${spacer * 0.5}rem`,
  s3: spacer,
  s4: `${spacer * 1.5}rem`,
  s5: `${spacer * 3}rem`,
};
export const fontSizeH1 = '2.5rem';
export const fontSizeH2 = '2rem';
export const fontSizeH3 = '1.75rem';
export const fontSizeH4 = '1.5rem';
export const fontSizeH5 = '1.25rem';
export const fontSizeH6 = '1rem';
export const headingsMarginBottom = `${spacer / 2}rem`;
export const headingsFontFamily = 'inherit';
export const headingsFontWeight = 500;

export const headingsLineHeight = 1.1;
export const headingsColor = 'inherit';
export const fontSize = {
  tiny: '0.60rem',
  small: '0.785rem',
  normal: '1rem',
  large: '1.5rem',
  xlarge: '2.0rem',
  huge: '3rem',
};

export const fontFamily = {
  primary:
    'BlinkMacSystemFont, -apple-system, "Roboto", Helvetica Neue, Helvetica, Roboto, Arial, sans-serif',
  header: 'BlinkMacSystemFont, -apple-system, "Chivo", Cambria, Times New Roman, Times, serif',
  monospace: 'Consolas, Liberation Mono, Courier, monospace',
};

export const fontWeight = {
  light: '300',
  regular: '400',
  bold: '600',
};

/**
 * Checks the lightness of `bgColor`, and if it passes the `threshold` of
 * lightness, it returns the `dark` color. Otherwise, it returns
 * the `light` color. Use this function to dynamically output a foreground color
 * based on a given background color.
 *
 * @param {string} bgColor - Color to check the lightness of.
 * @param {string} dark - Color to return if `bgColor` is light.
 * @param {string} light - Color to return if `bgColor` is dark.
 * @param {number} threshold - Threshold of lightness to check against.
 * @return {string} The dark color or light color.
 */

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

const primaryColor = Color('#0094c6').hsl().string();
const primaryColor2 = Color('#3178B7').hsl().string();
const primaryColor3 = Color('#1B252F').hsl().string();
const primaryColor4 = Color('#243140').hsl().string();
const primaryColor5 = Color('#2D3E50').hsl().string();
const primaryColor6 = Color('#4F6A92').hsl().string();
const primaryAccent = Color('#00bcd4').hsl().string();
const successColor = Color('#61e786').hsl().string();
const dangerColor = Color('#ef476f').hsl().string();
const warningColor = Color('#fffd82').hsl().string();
const infoColor = Color('#6320EE').hsl().string();
const neutralColor1 = Color('#ECF0F0').hsl().string();
const neutralColor2 = Color('#F7F7F9').hsl().string();
const neutralColor3 = Color('#DEE0E3').hsl().string();
const neutralColor4 = Color('#9198A0').hsl().string();
const gunmetalColor = Color('#202b39').hsl().string();
const nearBlackColor = Color('#030507').hsl().string();
const lightFontColor = Color('#F7F7F9').hsl().string();
const darkFontColor = Color('#030507').hsl().string();

const theme = {
  palette: {
    primary1: primaryColor,
    primary2: primaryColor2,
    primary3: primaryColor3,
    primary4: primaryColor4,
    primary5: primaryColor5,
    primary6: primaryColor6,
    primaryAccent: primaryAccent,
    success: successColor,
    danger: dangerColor,
    warning: warningColor,
    info: infoColor,
    neutral1: neutralColor1,
    neutral2: neutralColor2,
    neutral3: neutralColor3,
    neutral4: neutralColor4,
    gunmetal: gunmetalColor,
    nearBlack: nearBlackColor,
  },
  fontColor: {
    light: lightFontColor,
    dark: darkFontColor,
  },
  headings: {
    lineHeight: 1.1,
    fontFamily: fontFamily.header,
    fontWeight: 600,
    marginBottom: headingsMarginBottom,
    size: {
      h1: fontSizeH1,
      h2: fontSizeH2,
      h3: fontSizeH3,
      h4: fontSizeH4,
      h5: fontSizeH5,
      h6: fontSizeH6,
    },
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
  button: {
    text: {
      light: neutralColor2,
      dark: nearBlackColor,
    },
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

export default theme;
