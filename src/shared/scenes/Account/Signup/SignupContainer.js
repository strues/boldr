// @flow
import { connect } from 'react-redux';

import { doSignup } from '../../../state';
import Signup from './Signup';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: submit => {
      dispatch(doSignup(submit));
    },
  };
};

export default connect(null, mapDispatchToProps)(Signup);
