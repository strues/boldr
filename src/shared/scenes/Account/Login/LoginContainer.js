import { connect } from 'react-redux';
import { doLogin } from '../../../state/modules/auth/actions';
import Login from './Login';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: submit => {
      dispatch(doLogin(submit));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
