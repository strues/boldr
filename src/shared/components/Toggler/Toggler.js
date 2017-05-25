/* eslint-disable max-len */
/* @flow */
import React from 'react';
import styled from 'styled-components';
import { ifProp, get } from 'styled-tools';
import { mediaQuery } from '../../theme/theme';
import Icon from '../Icons';

type Props = {
  sidebarToggleable: boolean,
  iconColor: string,
  iconSize: number,
};
const ToggleButton = styled.button`
  ${mediaQuery.large`display: ${ifProp('sidebarToggleable', 'block !important')};`}
  ${mediaQuery.large`display: none;`}
  display: block;
  fill: white;
  padding: 0;
  margin: 0;
  line-height: 0;
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: color 250ms ease-in-out;
  margin-right: 10px;
`;
const Toggler = ({
  sidebarToggleable,
  iconColor,
  iconSize,
  ...props
}: Props) => {
  return (
    <ToggleButton sidebarToggleable={sidebarToggleable} {...props}>
      <Icon kind="menu" color={iconColor} size={iconSize} />
    </ToggleButton>
  );
};

Toggler.defaultProps = {
  iconColor: '#fff',
  iconSize: 20,
};

export default Toggler;
