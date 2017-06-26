/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
// internal
import FormCard from '../../../components/Form/FormCard';
import SignupForm from './SignupForm';

const Signup = (props: { onSubmit: () => void }) => {
  const formBottom = (
    <div>
      <span>Already have an account?</span>
      <Link to="/account/login"> Login</Link>
    </div>
  );
  function submitSignup(formInput) {
    props.onSubmit(formInput);
  }
  return (
    <div>
      <Helmet title="Signup" />
      <div className="boldr-form__signup">
        <FormCard
          skinny={false}
          title="Create an account"
          form={<SignupForm onSubmit={submitSignup} />}
          extra1={formBottom}
        />
      </div>
    </div>
  );
};

export default Signup;