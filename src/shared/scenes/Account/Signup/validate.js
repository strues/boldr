/* eslint-disable no-confusing-arrow */
const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 30) {
    errors.username = 'Must be 30 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  return errors;
};
const requiredValidator = value => value ? undefined : 'Required field!';

const emailValidator = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

export default validate;
export { requiredValidator, emailValidator };
