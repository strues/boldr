/* @fllow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList';
import TextField from 'react-md/lib/TextFields';
import { SiteName, SiteUrl, SiteDescription, Logo, Favicon } from './components';

class Settings extends Component {
  render() {
    return (
      <div className="boldr-settings">
        <Helmet title="Admin: Settings" />
        Settings.js
        <ExpansionList style={ { padding: 16 } }>
          <SiteName />
          <SiteUrl />
          <SiteDescription />
          <Logo />
          <Favicon />
        </ExpansionList>
      </div>
    );
  }
}

export default Settings;
