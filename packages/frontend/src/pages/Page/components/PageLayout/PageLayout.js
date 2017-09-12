// @flow
import React from 'react';
import type { Node } from 'react';
import { Footer, Container } from '@boldr/ui/Layout';
import styled from 'styled-components';
import View from '@boldr/ui/View';
import Navigation from '../Navigation';
import type { CurrentUser, RouterLocation, Menu } from '../../../../types/boldr';
//
// const StyledMain = styled.main`
//   margin: auto;
//   padding: 4.5rem 0 6rem;
//   width: 90%;
//   ${props => props.theme.media.md`
//     width: 80%;
//   `};
// `;

const ContentWrapper = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding-top: 52px;
  padding-bottom: 70px;
`;

type Props = {
  currentUser: CurrentUser,
  location: RouterLocation,
  onClickLogout: () => void,
  menu: Menu,
  children: Array<Node>,
  token: string,
};

const PageLayout = (props: Props) => {
  return (
    <View>
      <Navigation
        location={props.location}
        onLogout={props.onClickLogout}
        token={props.token}
        currentUser={props.currentUser}
        menu={props.menu}
      />
      <ContentWrapper>{props.children}</ContentWrapper>
      <Footer id="footer">
        <Container>Footer</Container>
      </Footer>
    </View>
  );
};

export default PageLayout;
