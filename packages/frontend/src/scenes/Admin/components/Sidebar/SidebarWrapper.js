/* @flow */
import React from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactChildren,
  isSmall: boolean,
  theme: Object,
};

const SidebarWrapper = (props: Props) => {
  const SidebarWrap = styled.aside`
    display: flex;
    flex-direction: column;
    box-shadow: 1px 0 2px rgba(0, 0, 0, .15);
    flex-direction: column;
    flex-basis: ${props => (props.isSmall ? '80px' : '200px')};
    white-space: nowrap;
    background: ${props => props.theme.palette.primary4};
    width: ${props => (props.isSmall ? '80px' : '200px')};
    flex-shrink: 0;
    position: relative;
    left: 0;
    top: 0;
  `;
  return (
    <SidebarWrap {...props}>
      {props.children}
    </SidebarWrap>
  );
};
SidebarWrapper.defaultProps = {
  sidebarDark: true,
  fullWidth: true,
};
export default SidebarWrapper;
