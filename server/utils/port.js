import { config } from '../config';

export const DEFAULT_PORT = 3000;
export const SERVER_PORT = normalizePort(config.get('server.port') || DEFAULT_PORT);

export function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
