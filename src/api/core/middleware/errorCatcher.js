import GeneralError from '../errors/generalError';

export default function(err, req, res, next) {
  if (!(err instanceof GeneralError)) {
    return next(new GeneralError(err.message, err.status, err.isPublic));
  }
  return next(err);
}
