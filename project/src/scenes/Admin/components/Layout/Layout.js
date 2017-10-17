/* @flow */
import React from 'react';
import type { Node } from 'react';
import { Hero, HeroHeader, HeroBody, HeroFooter } from '@boldr/ui/Hero';
// internal
import type { RouterLocation } from '../../../../types/boldr';
import Navigation from '../Navigation';
import DashboardMain from '../DashboardMain';
import DashboardFooter from '../DashboardFooter';

export type Props = {
  children: Node,
  location: RouterLocation,
};

function Layout(props: Props) {
  return (
    <Hero isColor="info" className="boldr-admin-layout" isFullHeight>
      <HeroHeader>
        <Navigation location={props.location} />
      </HeroHeader>
      <HeroBody>
        <DashboardMain>{props.children}</DashboardMain>
      </HeroBody>
      <HeroFooter>
        <DashboardFooter />
      </HeroFooter>
    </Hero>
  );
}
export default Layout;
