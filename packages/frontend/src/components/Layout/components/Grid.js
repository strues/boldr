import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { BREAKPOINT_NAMES } from '../constants';
import config from '../config';

const Grid = styled.div`
  margin-right: auto;
  margin-left: auto;

  ${props =>
    props.fluid &&
    css`
    padding-right: ${props => `${config(props).outerMargin}rem`};
    padding-left: ${props => `${config(props).outerMargin}rem`};
  `} ${p =>
      !p.fluid &&
      css`
    ${BREAKPOINT_NAMES.map(
      t =>
        config(p).container[t] &&
        config(p).media[t]`
        width: ${p => config(p).container[t]}rem;
      `,
    )}
  `};
`;

Grid.displayName = 'Grid';

Grid.propTypes = {
  fluid: PropTypes.bool,
  tagName: PropTypes.string,
  children: PropTypes.node,
};

export default Grid;
