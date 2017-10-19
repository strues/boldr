/* eslint-disable new-cap */

import { css } from 'styled-components';

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
  accumulator[label] = (...args) =>
    css`
      @media (min-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
  return accumulator;
}, {});
