import superagent from 'superagent';
import { API_HOST, API_PORT } from '../config/endpoints';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  console.log('REQUEST PATH', path);
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  if (__SERVER__) {
    console.log('----SERVER REQUEST----');
    // Prepend host and port of the API server to the path.
    return `http://${API_HOST}:${API_PORT + adjustedPath}`;
  }
  console.log('----CLIENT REQUEST----');
  // Prepend `/api` to relative URL, to proxy to API server.
  return `${adjustedPath}`;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers, files, fields } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (headers) {
          request.set(headers);
        }

        if (this.token) {
          request.set('Authorization', `Bearer ${this.token}`);
        }

        if (files) {
          files.forEach(file => request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach(item => request.field(item.key, item.value));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }

  setJwtToken(token) {
    this.token = token;
  }
  empty() {}
}
