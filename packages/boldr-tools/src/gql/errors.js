const forEach = require('lodash/forEach');
const isPlainObject = require('lodash/isPlainObject');
const isString = require('lodash/isString');

function humanizeError(field, error) {
  let { message } = error;
  const { keyword, params } = error.keyword;

  if (!keyword) {
    return { message };
  }

  if (keyword === 'required') {
    message = `${field} is required`;
  } else if (keyword === 'type') {
    const { type } = params;
    message = `${field} should be of type ${type}`;
  } else if (keyword === 'format') {
    const { format } = params;
    message = `${field} should be a valid ${format}`;
  } else if (keyword === 'minLength') {
    const { limit } = params;
    if (limit === 1) {
      message = `${field} is required`;
    } else {
      message = `${field} must be larger than ${limit} chars`;
    }
  } else if (keyword === 'maxLength') {
    const { limit } = params;
    message = `${field} must be shorter than ${limit} chars`;
  }

  return { message };
}

function formatError(error) {
  error.fields = {};

  const isDev = process.env.NODE_ENV !== 'production';

  const originalError = error.originalError || error;
  const message = originalError.data || originalError.message;
  const errorType = originalError.constructor.name;

  if (isDev) {
    error._stack = error.stack;
    error._type = errorType;
  }

  if (errorType === 'ValidationError' || errorType === 'UserError') {
    if (isString(message)) {
      error.fields.global = { message };
    } else if (isPlainObject(message)) {
      forEach(message, (value, key) => {
        if (typeof value === 'string') {
          error.fields[key] = {
            message: value,
          };
        } else if (Array.isArray(value)) {
          error.fields[key] = humanizeError(key, value[0]);
        } else {
          error.fields[key] = value;
        }
      });
    }

    if (isDev) {
      error._originalData = originalError.data;
      error._originalMessage = originalError.message;
    }

    error.message = 'Your query has errors';
  } else if (errorType === 'GraphQLError' && isString(message)) {
    let matches;
    matches = message.match(/Unknown argument "([a-zA-Z0-9_$.-]+)"/);
    if (matches) {
      error.fields[matches[1]] = {
        message: `Unknown Argument ${matches[1]}`,
        keyword: 'required',
      };
    }

    matches = message.match(/Argument "([a-zA-Z0-9_$.-]+)" has invalid/);
    if (matches) {
      error.fields[matches[1]] = {
        message: 'Invalid Value',
        keyword: 'required',
      };
    }

    matches = message.match(/Cannot query field "([a-zA-Z0-9_$.-]+)" on/);
    if (matches) {
      error.fields[matches[1]] = {
        message: `Field ${matches[1]} does not exist`,
        keyword: 'required',
      };
    }

    matches = message.match(/argument "([a-zA-Z0-9_$.-]+)" of type ".*?" is required/);
    if (matches) {
      error.fields[matches[1]] = {
        message: `${matches[1]} is required`,
        keyword: 'required',
      };
    }
  } else {
    if (isDev) {
      error._originalMessage = error.message;
    }

    error.message = 'Server error';
    error.fields.global = {
      message: error.message,
      keyword: 'internal',
    };
  }

  return error;
}

module.exports = { formatError, humanizeError };
