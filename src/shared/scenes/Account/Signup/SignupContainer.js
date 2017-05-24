// @flow
import { connect } from 'react-redux';

import { doSignup } from '../state';
import Signup from './Signup';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: formInput => {
      dispatch(doSignup(formInput));
    },
  };
};
// $FlowIssue
export default connect(null, mapDispatchToProps)(Signup);
