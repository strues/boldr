// @flow
import { Field } from 'redux-form';
import React from 'react';

import FormField from '../FormField';

const componentRenderer = ({
  meta: { error, touched },
  input,
  RenderedComponent,
  name,
  label,
  helpText,
  ...props
}) =>
  <FormField error={error} touched={touched} name={name} label={label} helpText={helpText}>
    <RenderedComponent name={name} {...input} {...props} />
  </FormField>;

const ReduxFormField = ({
  component,
  ...props
}: {
  component: any,
  name: string,
  label?: string,
}) => <Field {...props} RenderedComponent={component} component={componentRenderer} />;

export default ReduxFormField;
