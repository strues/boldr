/* @flow */
import React from 'react';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import {FormCard} from 'boldr-ui';

import BaseTemplate from '../../../templates/BaseTemplate';
import SignupForm from './SignupForm';

const Signup = (props: {onSubmit: () => void}) => {
  const formBottom = (
    <div>
      <span>Already have an account?</span>
      <Link to="/account/login"> Login</Link>
    </div>
  );
  return (
    <BaseTemplate helmetMeta={<Helmet title="Signup" />}>
      <div className="boldr-form__signup">
        <FormCard
          width={600}
          title="Signup"
          form={<SignupForm onSubmit={props.onSubmit} />}
          extra1={formBottom}
        />
      </div>
    </BaseTemplate>
  );
};

export default Signup;
