/* @fllow */
import { connect } from 'react-redux';
import {
  selectSettings,
  selectSettingFromList,
} from '../../../state/modules/boldr/settings';
import Settings from './Settings';

const mapStateToProps = state => {
  return {
    settings: selectSettings(state),
    siteName: selectSettingFromList(state, 1),
    siteUrl: selectSettingFromList(state, 2),
    siteDescription: selectSettingFromList(state, 4),
    siteLogo: selectSettingFromList(state, 3),
    siteFav: selectSettingFromList(state, 5),
  };
};

export default connect(mapStateToProps)(Settings);
