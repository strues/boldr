
const validateId = (id, errorMessage) => {
  if (!id || isNaN(parseInt(id, 10))) {
    console.error('Invalid or missing id');
    throw new Error(errorMessage || 'Invalid or missing id');
  }
};

export default validateId;
