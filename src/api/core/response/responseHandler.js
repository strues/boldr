import _ from 'lodash';

function getErrorStatus(err) {
  let errStatus = 500;
  if (err.name === 'error') {
    errStatus = 400;
  }
  return errStatus;
}

function responseHandler(err, res, status, data) {
  // TODO: send response based on the error message
  if (err) {
    const errStatus = getErrorStatus(err);
    return res.status(err.statusCode || errStatus || 500)
    .json(_.pickBy({ err: `${err.message}`, hint: `${err.hint || ''}` }));
  }
  return res.status(status || 200).json(data);
}

export default responseHandler;
