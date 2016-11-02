const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.display_name) {
    errors.display_name = 'Required';
  } else if (values.display_name.length > 30) {
    errors.display_name = 'Must be 30 characters or less';
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
