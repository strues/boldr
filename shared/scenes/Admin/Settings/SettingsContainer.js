/* @fllow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSettings, getSettingFromList } from '../../../state/modules/boldr/settings';
import Settings from './Settings';

const mapStateToProps = (state) => {
  return {
    settings: getSettings(state),
    siteName: getSettingFromList(state, 1),
    siteUrl: getSettingFromList(state, 2),
    siteDesc: getSettingFromList(state, 4),
    siteLogo: getSettingFromList(state, 3),
    siteFav: getSettingFromList(state, 5),
  };
};

export default connect(mapStateToProps)(Settings);
