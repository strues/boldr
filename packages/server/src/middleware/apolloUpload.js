/* eslint-disable new-cap, no-param-reassign, consistent-return, promise/catch-or-return, promise/always-return */
import fs from 'fs-extra';
import formidable from 'formidable';
import objectPath from 'object-path';
import _debug from 'debug';

const debug = _debug('boldr:server:middleware:apolloUp');

export function processRequest(req, { uploadDir } = {}) {
  // Ensure provided upload directory exists
  if (uploadDir) {
    fs.ensureDirSync(uploadDir);
  }

  const form = formidable.IncomingForm({
    // Defaults to the OS temp directory
    uploadDir,
  });

  // Parse the multipart form request
  return new Promise((resolve, reject) => {
    form.parse(req, (error, { operations }, files) => {
      if (error) {
        return reject(new Error(error));
      }
      debug('parsing form data');
      // Decode the GraphQL operation(s). This is an array
      // if batching is enabled.
      operations = JSON.parse(operations);
      // Check if files were uploaded
      if (Object.keys(files).length) {
        // File field names contain the original path to
        // the File object in the GraphQL operation input
        // variables. Relevent data for each uploaded file
        // now gets placed back in the variables.
        const operationsPath = objectPath(operations);
        Object.keys(files).forEach(variablesPath => {
          const { name, type, size, path } = files[variablesPath];
          return operationsPath.set(variablesPath, { name, type, size, path });
        });
      }

      // Provide fields for replacement request body
      return resolve(operations);
    });
  });
}

export default function apolloUpload(options) {
  return (req, res, next) => {
    // Skip if there are no uploads
    if (!req.is('multipart/form-data')) {
      return next();
    }
    processRequest(req, options).then(body => {
      req.body = body;
      // eslint-disable-next-line
      next();
    });
  };
}
