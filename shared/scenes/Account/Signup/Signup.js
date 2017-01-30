// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import FormCard from '../../../components/Form/FormCard';
import SignupForm from './SignupForm';

type Props = {
  handleOnSubmit: Function,
};

const Signup = (props: Props) => {
  const formBottom = (
    <div>
    <span>Already have an account?</span>
    <Link to="/account/login"> Login</Link>
  </div>
);
  return (
    <FormCard
      width={ 450 }
      title="Signup"
      form={ <SignupForm onSubmit={ props.handleOnSubmit } /> }
      extra1={ formBottom }
    />
  );
};

export default Signup;
