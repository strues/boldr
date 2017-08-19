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
  border: ${props => (props.isDark ? '1px solid #243140' : '1px solid #fafafa')};
  border-radius: 2px;
  margin: 0 4px;
  text-transform: capitalize;
  cursor: pointer;
  svg {
    color: ${props => (props.active ? '#00bcd4!important' : 'inherit')};
  }
  &:hover {
    svg {
      color: #00bcd4 !important;
    }
    opacity: ${props => (props.disabled ? 0.3 : 'inherit')};
    cursor: ${props => (props.disabled ? 'default' : 'inherit')};
  }
`;
