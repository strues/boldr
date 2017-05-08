/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { HeaderPanel, SettingsPanel } from 'boldr-ui';

import General from './components/General';

type Props = {
  siteName: Object,
  siteUrl: Object,
  siteLogo: Object,
  siteDescription: Object,
  siteFav: Object,
};

class Settings extends PureComponent {
  props: Props;

  render() {
    return (
      <div className="boldr-settings">
        <Helmet title="Admin: Settings" />
        <SettingsPanel>
          <HeaderPanel
            title="Boldr's Settings"
            subtitle="Modify how Boldr interacts with your website."
            image={
              <img
                src="https://boldr.io/assets/boldr-white-logo.png"
                width="100"
                alt="boldr logo"
              />
            }
          />
          <General
            siteName={this.props.siteName}
            siteUrl={this.props.siteUrl}
            siteLogo={this.props.siteLogo}
            siteDescription={this.props.siteDescription}
            siteFavicon={this.props.siteFav}
          />
        </SettingsPanel>
      </div>
    );
  }
}

export default Settings;
