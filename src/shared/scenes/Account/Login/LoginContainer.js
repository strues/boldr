import { connect } from 'react-redux';
import { doLogin } from '../../../state';
import Login from './Login';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: formInput => {
      dispatch(doLogin(formInput));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
