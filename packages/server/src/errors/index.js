// Stringify an object to handle multiple errors
// Wrap it in a new Error type to avoid sending it twice via the originalError field
export const errorObj = obj => new Error(JSON.stringify(obj));

export const handleSchemaErrors = (errors, genericMessage) => {
  if (Object.keys(errors).length > 0) {
    errors._error = genericMessage || 'Server validation error';
    throw errorObj(errors);
  }
};
