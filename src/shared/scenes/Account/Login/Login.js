/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import { FormCard } from 'boldr-ui';

import LoginForm from './LoginForm';

type Props = {
  onSubmit: () => void,
};
const Login = (props: Props) => {
  return (
    <div className="boldr-form__login">
      <Helmet title="Login" />
      <FormCard
        title="Log In"
        lightText
        skinny
        form={<LoginForm onSubmit={props.onSubmit} />}
      />
    </div>
  );
};

export default Login;
