/* @flow */
import { connect } from 'react-redux';
import {
  showModal,
  hideModal,
  updateMenuDetails,
  addMenuDetail,
  selectSettingFromList,
} from '../../../state';
import Navigation from './Navigation';

function mapStateToProps(state) {
  return {
    mainMenu: state.boldr.menus.main,
    modal: state.boldr.ui.modal,
  };
}
export default connect(mapStateToProps, {
  updateMenuDetails,
  addMenuDetail,
  showModal,
  hideModal,
})(Navigation);
