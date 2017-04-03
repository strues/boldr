import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FormCard } from 'boldr-ui';
import SignupForm from './SignupForm';

const Signup = props => {
  const formBottom = (
    <div>
      <span>Already have an account?</span>
      <Link to="/account/login"> Login</Link>
    </div>
  );
  return (
    <div className="boldr-form__signup">
      <Helmet title="Signup" />
      <FormCard
        width={ 600 }
        title="Signup"
        form={ <SignupForm onSubmit={ props.onSubmit } /> }
        extra1={ formBottom }
      />
    </div>
  );
};

Signup.propTypes = {
  onSubmit: PropTypes.func,
};

export default Signup;
