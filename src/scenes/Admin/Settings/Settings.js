/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Grid, Col, Row } from '@boldr/ui/Layout';
import Headline from '@boldr/ui/Headline';
import Paper from '@boldr/ui/Paper';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from '@boldr/ui/Accordion';
// import { HeaderPanel, SettingsPanel } from 'boldr-ui';
import SettingsAside from './components/SettingsAside';
import General from './components/General';

type Props = {
  settings: Array<Setting>,
};
function filterSiteName(obj) {
  return parseInt(obj.id, 10) === 1;
}
function filterSiteUrl(obj) {
  return parseInt(obj.id, 10) === 2;
}
function filterSiteLogo(obj) {
  return parseInt(obj.id, 10) === 3;
}
function filterSiteDescript(obj) {
  return parseInt(obj.id, 10) === 4;
}
function filterSiteFav(obj) {
  return parseInt(obj.id, 10) === 5;
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0;
  height: 100%;
`;
class Settings extends PureComponent {
  props: Props;

  render() {
    const { settings } = this.props;
    const siteName = settings.find(filterSiteName);
    const siteLogo = settings.find(filterSiteLogo);
    const siteDescription = settings.find(filterSiteDescript);
    const siteFavicon = settings.find(filterSiteFav);
    const siteUrl = settings.find(filterSiteUrl);
    return (
      <div>
        <Helmet title="Admin: Settings" />
        <Content>
          <SettingsAside />
          <General />
        </Content>
      </div>
    );
  }
}

export default Settings;
