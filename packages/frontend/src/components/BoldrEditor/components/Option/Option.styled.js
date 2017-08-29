/* eslint-disable no-unused-vars */
import * as React from 'react';
import styled from 'styled-components';

export const OptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 25px;
  height: 20px;
  padding: 3px;
  background-color: ${props =>
    props.active ? `${props.theme.palette.primary1}!important;` : 'transparent'};
  border: ${props =>
    props.isDark ? '1px solid #243140' : `1px solid ${props.theme.palette.neutral2}`};
  border-radius: 2px;
  margin: 0 4px;

  &:active {
    opacity: ${props => (props.disabled ? 0.3 : 'inherit')};
    cursor: ${props => (props.disabled ? 'default' : 'inherit')};
  }
`;

OptionWrapper.defaultProps = {
  theme: {
    palette: {
      primary1: '#0094c6',
      neutral2: '#F7F7F9',
    },
  },
};
