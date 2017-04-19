import React from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import { FormCard } from 'boldr-ui';

import LoginForm from './LoginForm';
type Props = {
  onSubmit: () => void,
};
const Login = props => {
  return (
    <div className="boldr-form__login">
      <Helmet title="Login" />
      <FormCard
        title="Log In"
        width={450}
        form={<LoginForm onSubmit={props.onSubmit} />}
        extra1={
          <Link to="/account/forgot-password">Forgot your password?</Link>
        }
        extra2={<Link to="/account/signup">Create an account</Link>}
      />
    </div>
  );
};

export default Login;
