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
  background-color: transparent;
  border: ${props =>
    props.isDark ? '1px solid #243140' : `1px solid ${props.theme.palette.neutral2}`};
  border-radius: 2px;
  margin: 0 4px;
  text-transform: capitalize;

  svg {
    color: ${props => (props.active ? `${props.theme.palette.primary1}!important;` : 'inherit')};
  }
  &:hover {
    svg {
      color: ${props => props.theme.palette.primary1} !important;
    }
    opacity: ${props => (props.disabled ? 0.3 : 'inherit')};
    cursor: ${props => (props.disabled ? 'default' : 'inherit')};
  }
`;
