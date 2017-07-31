import { css } from 'styled-components';

const SIZES = {
  large: 75,
  medium: 62,
  small: 48,
};

const theme = {
  palette: {
    primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
    secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
    danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
    alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
    success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
    grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#eeeeee', '#ffffff'],
    white: ['#fff', '#fff', '#eee'],
  },
  colors: {
    blue: '#00bcd4',
  },
  fonts: {
    primary: 'Roboto, Helvetica, Roboto, sans-serif',
    pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
    quote: 'Georgia, serif',
  },
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

export default theme;
