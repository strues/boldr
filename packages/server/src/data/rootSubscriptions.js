import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import isAuthenticated from '../services/authentication/isAuthenticated';
import { pubSubClient } from '../services/redis/redis';
import RootSchema from './rootSchema';

const createSubscriptionManager = server =>
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: RootSchema,
      pubsub: pubSubClient,

      onConnect: ({ token }, connection) => {
        // Attach the token from the connection options if it was provided.
        if (token) {
          // Attach it to the upgrade request.
          connection.upgradeReq.headers['authorization'] = `Bearer ${token}`;
        }
      },
      onOperation: (parsedMessage, baseParams, connection) => {
        // Cache the upgrade request.
        let upgradeReq = connection.upgradeReq;

        // Attach the context per request.
        baseParams.context = async () => {
          let req;

          try {
            req = await isAuthenticated(upgradeReq);
          } catch (e) {
            console.error(e);

            // return new Context({});
          }

          return req;
        };

        return baseParams;
      },
    },
    {
      server,
      path: '/subscriptions',
    },
  );

export default createSubscriptionManager;
