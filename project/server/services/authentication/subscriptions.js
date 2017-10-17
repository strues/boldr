import authService from './authService';

// Session data does not automatically attach to websocket req objects.
// This middleware code looks for a user in the session and, if it exists,
// attaches it to the graph req.
export const deserializeUser = req => {
  return new Promise((resolve, reject) => {
    // This uses the authentication connect middleware to establish the
    // current user.
    authService(req, null, err => {
      if (err) {
        return reject(err);
      }

      // Resolve with the request (user removed possibly).
      return resolve(req);
    });
  });
};
