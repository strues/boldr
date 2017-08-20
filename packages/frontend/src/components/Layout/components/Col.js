import PropTypes from 'prop-types';
import styled from 'styled-components';
import isInteger from 'lodash/isInteger';
import { BREAKPOINT_NAMES } from '../constants';
import config from '../config';

const ModificatorType = PropTypes.oneOfType([PropTypes.number, PropTypes.bool]);

const offsetProps = BREAKPOINT_NAMES.map(d => d + 'Offset');
const DimensionPropTypes = BREAKPOINT_NAMES.reduce((propTypes, dimension) => {
  propTypes[dimension] = ModificatorType;
  propTypes[dimension + 'Offset'] = PropTypes.number;
  return propTypes;
}, {});

const Col = styled.div`
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-right: ${p => config(p).gutterWidth / 2}rem;
  padding-left: ${p => config(p).gutterWidth / 2}rem;

  ${p =>
    p.reverse &&
    `
    flex-direction: column-reverse;
  `} ${p =>
      Object.keys(p)
        .filter(k => ~BREAKPOINT_NAMES.indexOf(k))
        .sort((k1, k2) => BREAKPOINT_NAMES.indexOf(k1) - BREAKPOINT_NAMES.indexOf(k2))
        .map(
          k =>
            config(p).media[k]`${isInteger(p[k])
              ? `
        flex-basis: ${100 / config(p).gridSize * p[k]}%;
        max-width: ${100 / config(p).gridSize * p[k]}%;
        display: block;
      `
              : p[k]
                ? `
          flex-grow: 1;
          flex-basis: 0;
          max-width: 100%;
          display: block;
        `
                : 'display: none;'}`,
        )} ${p =>
      Object.keys(p).filter(k => ~offsetProps.indexOf(k)).map(
        k => config(p).media[k.replace(/Offset$/, '')]`
        margin-left: ${100 / config(p).gridSize * p[k]}%;
      `,
      )};
`;

Col.displayName = 'Col';

Col.propTypes = {
  ...DimensionPropTypes,
  reverse: PropTypes.bool,
  tagName: PropTypes.string,
  children: PropTypes.node,
};

export default Col;
