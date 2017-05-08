/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExpandablePanel, SettingsGroup, SettingsItem } from 'boldr-ui';

import SiteDescription from './SiteDescription';
import SiteName from './SiteName';
import Logo from './Logo';
import Favicon from './Favicon';
import SiteUrl from './SiteUrl';

type Props = {
  siteName: Object,
  siteDescription: Object,
  siteUrl: Object,
  siteFavicon: Object,
  siteLogo: Object,
};

class General extends Component {
  props: Props;
  render() {
    return (
      <ExpandablePanel
        title="General Settings"
        description="The basics of site customization"
      >
        <SettingsGroup title="Site Meta">
          <SettingsItem
            title="Site Name"
            description="The name of your website."
          >
            <SiteName {...this.props.siteName} />
          </SettingsItem>
          <SettingsItem
            title="Site Description"
            description="The description of your website."
          >
            <SiteDescription {...this.props.siteDescription} />
          </SettingsItem>
          <SettingsItem
            title="Site URL"
            description="The address of your website."
          >
            <SiteUrl {...this.props.siteUrl} />
          </SettingsItem>
        </SettingsGroup>
        <SettingsGroup title="Site Branding">
          <SettingsItem
            title="Logo"
            description="The logo image for your website."
          >
            <Logo {...this.props.siteLogo} />
          </SettingsItem>
          <SettingsItem
            title="Favicon"
            description="A favicon to use for your site"
          >
            <Favicon {...this.props.siteFavicon} />
          </SettingsItem>
        </SettingsGroup>
      </ExpandablePanel>
    );
  }
}

export default connect()(General);
