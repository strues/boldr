/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { HeaderPanel, SettingsPanel } from 'boldr-ui';

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
            siteName={siteName}
            siteUrl={siteUrl}
            siteLogo={siteLogo}
            siteDescription={siteDescription}
            siteFavicon={siteFavicon}
          />
        </SettingsPanel>
      </div>
    );
  }
}

export default Settings;
