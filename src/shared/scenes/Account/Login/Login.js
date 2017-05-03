/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { FormCard } from 'boldr-ui';

import LoginForm from './LoginForm';

type Props = {
  onSubmit: () => void,
};
const Login = (props: Props) => {
  function submitLogin(formInput) {
    props.onSubmit(formInput);
  }
  return (
    <div className="boldr-form__login">
      <Helmet title="Login" />
      <FormCard
        title="Log in to your account"
        lightText
        skinny
        form={<LoginForm onSubmit={submitLogin} />}
      />
    </div>
  );
};

export default Login;
