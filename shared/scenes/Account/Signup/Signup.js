import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FormCard from '../../../components/Form/FormCard';
import SignupForm from './SignupForm';


const Signup = (props) => {
  const formBottom = (
    <div>
    <span>Already have an account?</span>
    <Link to="/account/login"> Login</Link>
  </div>
);
  return (
    <div className="boldr-form__signup">
      <FormCard
        width={ 450 }
        title="Signup"
        form={ <SignupForm onSubmit={ props.handleOnSubmit } /> }
        extra1={ formBottom }
      />
  </div>
  );
};

Signup.propTypes = {
  handleOnSubmit: PropTypes.func,
};

export default Signup;
