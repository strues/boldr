import getPubsubClient from '../services/pubsub/pubsub';

export default (req, res, next) => {
  // Attach the pubsub handle to the requests.
  req.pubsub = getPubsubClient();

  // Forward on the request.
  next();
};
