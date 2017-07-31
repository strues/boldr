import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import { SubmissionError } from 'redux-form';

export const responseHasErrors = response => !!response.graphQLErrors;

const flattenErrorObject = (data, accum, key) => {
  if (isPlainObject(data)) {
    Object.keys(data).forEach(nestedKey => {
      flattenErrorObject(data[nestedKey], accum, nestedKey);
    });
  } else {
    data.forEach(keyMessage => accum.push(`Error on field ${key}: ${keyMessage}`));
  }
};

export const formatRemoteErrors = errors =>
  errors.reduce((accum, { message, data }) => {
    if (!data) {
      accum.push(message);
      return accum;
    }
    if (isString(data)) {
      accum.push(data);
      return accum;
    }
    flattenErrorObject(data, accum);
    return accum;
  }, []);

export const formatGeneralAPIErrors = response => {
  if (!responseHasErrors(response)) {
    return null;
  }
  return formatRemoteErrors(response.graphQLErrors);
};

/* eslint-disable no-underscore-dangle, no-param-reassign */

const generateErrorObject = (data, accum, key) => {
  if (isPlainObject(data)) {
    if (key) {
      accum[key] = {};
    }
    Object.keys(data).forEach(nestedKey => {
      generateErrorObject(data[nestedKey], key ? accum[key] : accum, nestedKey);
    });
  } else {
    if (!accum[key]) {
      accum[key] = [];
    }
    accum[key] = accum[key].concat(data);
  }
};

export const formatGeneralReduxFormErrors = response => {
  throw new SubmissionError({ _error: formatGeneralAPIErrors(response) });
};

export const formatReduxFormErrors = response => {
  if (!responseHasErrors(response)) {
    return null;
  }
  const errors = response.graphQLErrors.reduce(
    (accum, { message, data }) => {
      if (!data) {
        accum._error = accum._error.concat(message);
        return accum;
      }
      if (isString(data)) {
        accum._error = accum._error.concat(data);
        return accum;
      }
      generateErrorObject(data, accum);
      return accum;
    },
    { _error: [] },
  );
  if (!errors._error.length) {
    delete errors._error;
  }

  throw new SubmissionError(errors);
};
/* eslint-enable no-underscore-dangle, no-param-reassign */
