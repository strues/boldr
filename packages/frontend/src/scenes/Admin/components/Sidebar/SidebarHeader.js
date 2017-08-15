/* @flow */
import React from 'react';
import styled from 'styled-components';
import cN from 'classnames';
import Link from 'react-router-dom/Link';

type Props = {
  logoSrc: string,
  isSmall: boolean,
  logoLink: string,
};
const LogoElement = styled.div`
  justify-content: center;
  width: 100%;
  position: relative;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  position: relative;
  height: 54px;
  background-color: #00bcd4;
  line-height: 54px;
  padding: 0 18px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
`;
const SidebarHeader = (props: Props) => {
  return (
    <Header>
      <LogoElement>
        <Link to={props.logoLink}>
          <img
            src={props.logoSrc}
            className={cN('boldrui-sidebar-header-logo', { 'is-small': props.isSmall })}
          />
        </Link>
      </LogoElement>
    </Header>
  );
};

SidebarHeader.defaultProps = {
  logoSrc: 'https://boldr.io/assets/boldr-white-logo.png',
};

export default SidebarHeader;
