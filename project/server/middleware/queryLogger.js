import bodyParser from 'body-parser';
import _debug from 'debug';

const debug = _debug('boldr:server:graphql');

/* eslint-disable no-console */

// create application/json parser
const jsonParser = bodyParser.json();

export default function queryLogger() {
  return [
    jsonParser,
    (req, res, next) => {
      const date = new Date();
      debug(`--- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})} ---`);
      debug(`query:\n ${req.body.query}`);
      debug(`variables:\n${JSON.stringify(req.body.variables, null, 2)}`);
      debug('');
      Object.keys(req.headers).forEach(k => debug(`${k}:`, req.headers[k]));
      next();
    },
  ];
}
