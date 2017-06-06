/**
 * This will take the errors given by the validation library of Objeciton.js
 * and converts them into something friendlier for us.
 *
 * @param {object} errors
 * @returns {object}
 */
function formatValidationErrors(errors) {
  const newErrors = {};

  Object.keys(errors).forEach(property => {
    newErrors[property] = errors[property].map(errorList => errorList.message);
  });

  return newErrors;
}
export default formatValidationErrors;
