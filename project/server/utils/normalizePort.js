/**
 * normalizes the port forr the server to listen on.
 *
 * @export
 * @param {any} val the port value
 * @returns  the port (int) or false
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
