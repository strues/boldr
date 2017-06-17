import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadProfileImage, uploadAvatarImage } from '../../Admin/state';
import Preferences from './Preferences';

const mapStateToProps = state => {
  return {
    me: state.users.me,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadProfileImage: bindActionCreators(uploadProfileImage, dispatch),
    uploadAvatarImage: bindActionCreators(uploadAvatarImage, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
