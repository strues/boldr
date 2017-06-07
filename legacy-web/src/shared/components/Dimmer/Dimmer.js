/* @flow */
import React from 'react';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { theme } from '../../theme';

const Dimmer = styled.div`
  position: absolute;
  top: 0; right: 0; left: 0; bottom: 0;
  transition: opacity 0.5s;
  background: rgba(0,0,0, .35);
  border-radius: ${theme.borders.radius};
  opacity: 0;
  color: ${palette('white', 0)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;

export default Dimmer;
