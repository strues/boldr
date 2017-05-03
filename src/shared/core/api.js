/* eslint-disable dot-notation */
import axios from 'axios';
import { getToken } from './authentication/token';

const isBrowser = typeof window === 'object';
const token = isBrowser ? getToken() : null;

export const API_PREFIX = '/api/v1';

const api = axios.create({
  validateStatus: status => status >= 200 && status < 500,
});

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
api.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';

api.defaults.withCredentials = true;

api.onUnauthorizedError = callback => {
  api.interceptors.response.use(response => {
    if (response.status === 401) {
      callback(response);
    }
    return response;
  });
};

export default api;
