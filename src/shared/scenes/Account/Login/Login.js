/* @flow */
import React from 'react';
import { Link } from 'react-router';
import FormCard from '../../../components/Form/FormCard';
import LoginForm from './LoginForm';

type Props = {
  handleOnSubmit: Function,
};

const Login = (props: Props) => {
  return (
      <div>
        <FormCard
          title="Log In"
          form={ <LoginForm onSubmit={ props.handleOnSubmit } /> }
          extra1={ <Link to="/account/forgot-password">Forgot your password?</Link> }
          extra2={ <Link to="/account/signup">Create an account</Link> }
        />
      </div>
  );
};

export default Login;
