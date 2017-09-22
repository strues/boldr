/**
 * normalizes the port forr the server to listen on.
 *
 * @exports normalizePort
 * @param {any} val the port value
 * @returns {int} the port integer
 */
export default function normalizePort(val) {
  const port = parseInt(val, 10);

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
