import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FormCard from '../../../components/Form/FormCard';
import LoginForm from './LoginForm';

const Login = (props: Props) => {
  return (
    <div className="boldr-form__login">
    <FormCard
      title="Log In"
      width={ 450 }
      form={ <LoginForm onSubmit={ props.handleOnSubmit } /> }
      extra1={ <Link to="/account/forgot-password">Forgot your password?</Link> }
      extra2={ <Link to="/account/signup">Create an account</Link> }
    />
  </div>
  );
};

Login.propTypes = {
  handleOnSubmit: PropTypes.func,
};

export default Login;
