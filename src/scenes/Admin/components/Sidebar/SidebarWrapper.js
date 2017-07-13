/* @flow */
import React from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactChildren,
  sidebarDark: boolean,
  fullWidth: boolean,
};

const SidebarWrapper = (props: Props) => {
  const SidebarWrap = styled.aside`
    display: flex;
    flex-direction: column;
    box-shadow: 1px 0 2px rgba(0, 0, 0, .15);
    flex-direction: column;
    flex-basis: 200px;
    white-space: nowrap;
    background: #202b39;
    width: 200px;
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
