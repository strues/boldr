import { getClient } from '../services/pubsub/pubsub';

export default (req, res, next) => {
  // Attach the pubsub handle to the requests.
  req.pubsub = getClient();

  // Forward on the request.
  next();
};
