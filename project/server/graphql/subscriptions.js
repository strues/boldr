import { SubscriptionManager } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import _debug from 'debug';
// internals
import { deserializeUser } from '../services/authentication/subscriptions';
import getPubSubClient from '../services/pubsub';
import schema from './schema';
import Context from './context';

const debug = _debug('boldr:server:graphql:subscriptions');

const onConnect = ({ token }, connection) => {
  // Attach the token from the connection options if it was provided.
  if (token) {
    debug('token sent via onConnect, attaching to the headers of the upgrade request');

    // Attach it to the upgrade request.
    connection.upgradeReq.headers.authorization = `Bearer ${token}`;
  }
};
const onOperation = (parsedMessage, baseParams, connection) => {
  // Cache the upgrade request.
  const upgradeReq = connection.upgradeReq;

  // Attach the context per request.
  baseParams.context = async () => {
    let req;

    try {
      req = await deserializeUser(upgradeReq);
      debug(`user ${req.user ? 'was' : 'was not'} on websocket request`);
    } catch (e) {
      console.error(e);

      return new Context({});
    }

    return new Context(req);
  };

  return baseParams;
};

/**
 * This creates a new subscription manager.
 */
export const createSubscriptionManager = server =>
  new SubscriptionServer(
    {
      subscriptionManager: new SubscriptionManager({
        schema,
        pubsub: getPubSubClient(),
        setupFunctions,
      }),
      onConnect,
      onOperation,
      keepAlive: ms('30s'),
    },
    {
      server,
      path: '/api/v1/graphql',
    },
  );
