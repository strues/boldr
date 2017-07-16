import { connect } from 'react-redux';

import { doLogin } from '../state/actions';
import Login from './Login';

const mapDispatchToProps = dispatch => ({
  onSubmit: formInput => {
    dispatch(doLogin(formInput));
  },
});

export default connect(null, mapDispatchToProps)(Login);
