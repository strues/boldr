// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import FormCard from '../../../components/Form/FormCard';
import SignupForm from './SignupForm';

type Props = {
  handleOnSubmit: Function,
};

const Signup = (props: Props) => {
  return (
    <FormCard
      title="Signup"
      form={ <SignupForm onSubmit={ props.handleOnSubmit } /> }
      extra1="Already have an account?"
      extra2={ <Link to="/account/login"> Login</Link> }
    />
  );
};

export default Signup;
