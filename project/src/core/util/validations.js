/* @flow */
export const isEmail = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const isRequired = (value: any) => (value ? undefined : 'Required');
export const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);

export const isNumber = (value: string | number) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const minValue18 = minValue(18);

const validations = {
  isRequired,
  isEmail,
  maxLength,
  maxLength15,
  isNumber,
  minValue,
};

export default validations;
