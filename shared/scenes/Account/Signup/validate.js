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
  if (!values.first_name) {
    errors.first_name = 'Required';
  }
  return errors;
};

export default validate;
