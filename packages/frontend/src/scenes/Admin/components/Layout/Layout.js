/* @flow */
import * as React from 'react';
import { Hero, HeroHeader, HeroBody, HeroFooter } from '@boldr/ui/Hero';
// internal
import Navigation from '../Navigation';
import DashboardMain from '../DashboardMain';
import DashboardFooter from '../DashboardFooter';

export type Props = {
  children: React.ChildrenArray<number>,
  location: Object,
};

function Layout(props: Props) {
  return (
    <Hero isColor="info" className="boldrui-admin-layout" isFullHeight>
      <HeroHeader>
        <Navigation location={props.location} />
      </HeroHeader>
      <HeroBody>
        <DashboardMain>
          {props.children}
        </DashboardMain>
      </HeroBody>
      <HeroFooter>
        <DashboardFooter />
      </HeroFooter>
    </Hero>
  );
}
export default Layout;
