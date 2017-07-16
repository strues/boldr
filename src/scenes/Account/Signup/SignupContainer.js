// @flow

import { connect } from 'react-redux';
// internal
import { doSignup } from '../state/actions';
import Signup from './Signup';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: formInput => {
    dispatch(doSignup(formInput));
  },
});

export default connect(null, mapDispatchToProps)(Signup);
